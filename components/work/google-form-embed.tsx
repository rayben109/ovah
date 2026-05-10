export default function GoogleFormEmbed() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-[#182858]">
        Register / Apply Form
      </h2>

      <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScze1zXSxGYTwqG8KJfKVugZqjc_XW-YXX9OLj6_T1KCo7pCQ/viewform?embedded=true"
          className="w-full h-[1200px] border-0"
          loading="lazy"
        />
      </div>
    </section>
  )
}
