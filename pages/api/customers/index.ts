import { MongoError, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const { method } = req;

  switch (method) {
    case "GET":
      const customers = await db
        .collection("customers")
        .find({})
        .sort({ metacritic: -1 })
        .limit(20)
        .toArray();

      res.status(200).json(customers);
      break;
    case "POST":
      // create new customer
      const customer: Customer = req.body;
      try {
        const { acknowledged, insertedId } = await db
          .collection("customers")
          .insertOne(customer);

        if (acknowledged) {
          const createdCustomer = await db
            .collection("customers")
            .findOne({ _id: new ObjectId(insertedId) });
          res.setHeader("Location", `/api/customers/${insertedId}`);
          res.status(201).json(createdCustomer);
        } else {
          res.status(502).json({ error: "Customer not created" });
        }
      } catch (error) {
        if (error instanceof MongoError) {
          if (error.code === 11000) {
            res.status(409).json({
              error: `Já existe cadastro de cliente com o nome ${customer.name}`,
            });
          } else {
            res.status(500).json({ error: `Mongo DB error: ${error}` });
          }
        } else {
          res.status(500).json({ error: `Server error: ${error}` });
        }
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
