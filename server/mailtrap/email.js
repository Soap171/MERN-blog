import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";
import { errorHandler } from "../utils/error.js";
import { MailtrapClient } from "mailtrap";
export const sendVerificationEmail = async (email, token, next) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", token),
      category: "Email Verification",
    });

    console.log(response);
  } catch (error) {
    next(errorHandler(error));
    console.log(error);
  }
};

export const sendWelcomeEmail = async (email, name, next) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "0ba7c2f8-5954-4ce7-a8f4-fb525c60b1fa",
      template_variables: {
        name: name,
        company_info_name: "Blog",
      },
    });
    console.log("Welcome email sent successfully", response);
  } catch (error) {
    next(errorHandler(error));
    console.log(error);
  }
};
