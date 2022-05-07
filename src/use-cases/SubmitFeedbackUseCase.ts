import { MailAdapter } from "../adapters/MailAdapter"
import { FeedbackRepository } from "../repositories/FeedbacksRepository"

interface SubmitFeedbackUseCaseRequest {
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbackRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request

    if (!type) {
      throw new Error("type is required")
    }

    if (!comment) {
      throw new Error("comment is required")
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Screenshot must be a base64 encoded image")
    }

    await this.feedbacksRepository.create({ type, comment, screenshot })

    await this.mailAdapter.sendMail({
      subject: "Novo feeback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<h3>Novo feedback de ${type}</h3>`,
        `<p>${comment}</p>`,
        `${screenshot ? `<img src="${screenshot}" />` : ""}`,
        `</div>`,
      ].join("\n"),
    })
  }
}
