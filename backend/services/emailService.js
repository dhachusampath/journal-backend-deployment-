const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// Send OTP email
const sendOTPEmail = async (email, otp, name = "User") => {
  try {
    const { data, error } = await resend.emails.send({
      // Use "onboarding@resend.dev" for immediate testing without domain verification.
      // Once you verify your own domain in Resend's dashboard, switch this to
      // something like "noreply@yourdomain.com"
      from: "onboarding@resend.dev",
      to: email,
      subject: "Password Reset OTP - Your Authentication Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
          <p style="color: #555; font-size: 16px;">Hello ${name},</p>
          <p style="color: #555; font-size: 16px;">We received a request to reset your password. Please use the OTP below to proceed:</p>
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
            <h1 style="color: #007bff; margin: 0; letter-spacing: 5px;">${otp}</h1>
          </div>
          <p style="color: #555; font-size: 14px;">This OTP is valid for <strong>10 minutes</strong>.</p>
          <p style="color: #555; font-size: 14px;">If you didn't request this, please ignore this email.</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #888; font-size: 12px; text-align: center;">This is an automated message, please do not reply.</p>
        </div>
      `,
    });

    if (error) {
      // Resend returns errors as a field on the response instead of throwing,
      // so we have to check for it explicitly and throw ourselves
      console.error("Resend API error:", error);
      throw new Error("Failed to send OTP email");
    }

    console.log("OTP email sent, id:", data?.id);
    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Failed to send OTP email");
  }
};

module.exports = {
  sendOTPEmail,
};
