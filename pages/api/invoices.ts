import { MongoError, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../util/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const { method } = req;

  switch (method) {
    case "POST":
      // create new invoice
      const invoice: Invoice = {
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      try {
        const { acknowledged, insertedId } = await db
          .collection("invoices")
          .insertOne(invoice);

        if (acknowledged) {
          const createdInvoice = await db
            .collection("invoices")
            .findOne({ _id: new ObjectId(insertedId) });
          res.setHeader("Location", `/api/invoices/${insertedId}`);
          res.status(201).json(createdInvoice);
        } else {
          res.status(502).json({ error: "Invoice not created" });
        }
      } catch (error) {
        if (error instanceof MongoError) {
          res.status(500).json({ error: `Mongo DB error: ${error}` });
        } else {
          res.status(500).json({ error: `Server error: ${error}` });
        }
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
