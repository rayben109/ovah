import EmailSignatureGenerator from "@/components/admin/EmailSignatureGenerator"

export default function SignaturePage() {
  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#182858]">Email Signature Generator</h1>
        <p className="text-sm text-gray-500 mt-1">
          Create professional email signatures for OVAH staff — copy the HTML and paste directly into Gmail or Outlook.
        </p>
      </div>
      <EmailSignatureGenerator />
    </div>
  )
}
