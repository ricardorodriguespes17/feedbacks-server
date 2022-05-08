import express, { Request, Response } from "express"
import { SubmitFeedbackUseCase } from "./use-cases/SubmitFeedbackUseCase"
import { PrismaFeedbacksRepository } from "./repositories/prisma/PrismaFeebacksRepository"
import { NodemailerMailAdapter } from "./adapters/nodemailer/NodemailerMailAdapter"

export const routes = express.Router()

routes.get("/", (req: Request, res: Response) => {
  return res.send("Hello World!")
})

routes.post("/feedbacks", async (req: Request, res: Response) => {
  const { type, comment, screenshot } = req.body

  try {
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()
    const submitFeebackUseCase = new SubmitFeedbackUseCase(
      prismaFeedbacksRepository,
      nodemailerMailAdapter
    )

    await submitFeebackUseCase.execute({ type, comment, screenshot })
  } catch (err) {
    console.log(err)

    return res.status(500).send({ error: err })
  }

  return res.status(201).send()
})
