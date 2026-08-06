import Image from "next/image"

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-16 ">
      <div className="flex flex-col items-center md:items-start gap-8">
        <h2 className="text-7xl font-bold text-blue-500 text-center md:text-left">Hero Page</h2>
        <p className="text-gray-700 max-w-2xl text-center md:text-left">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit, cum eaque tenetur facere ad illum perferendis sit assumenda obcaecati maiores.</p>
      </div>
      <div>
      <Image
      src="/ChatGPT Image May 24, 2026, 10_14_12 PM.png"
      alt="Hero"
      width={400}
      height={400}
    />
      </div>
    </div>
  )
}

export default Hero
