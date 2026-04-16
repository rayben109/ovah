import { useState } from "react"

export default function NewsletterForm({
  title = "Stay Updated",
  placeholder = "Your email",
  buttonText = "Subscribe",
  className = "",
}) {
  const [email, setEmail] = useState("")

  return (
    <div className={`pt-4 ${className}`}>
      <h4 className="font-medium mb-2">{title}</h4>

      <form
        action="https://ovah.us1.list-manage.com/subscribe/post?u=c9575656960434563f2c799cd&id=a1c98fd1ba&f_id=00eff2e4f0"
        method="POST"
        target="_blank"
        className="flex gap-2"
      >
        <input
          type="email"
          name="EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          className="bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 px-3 py-2 rounded-md w-full"
        />

        {/* Hidden bot protection field */}
        <input
          type="text"
          name="b_c9575656960434563f2c799cd_a1c98fd1ba"
          tabIndex="-1"
          className="hidden"
        />

        <button
          type="submit"
          className="bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-md"
        >
          {buttonText}
        </button>
      </form>
    </div>
  )
}
