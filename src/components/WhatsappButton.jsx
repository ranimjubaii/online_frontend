import { FaWhatsapp } from "react-icons/fa";
export default function WhatsAppButton({ courseTitle }) {
  const phoneNumber = "96176783258";
  const message =
    `Hello, I want to register in the ${courseTitle} course`;
  const whatsappUrl =
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="btn btn-success w-100"
    >
      <FaWhatsapp className="me-2" />
      Contact on WhatsApp
    </a>
  );
}