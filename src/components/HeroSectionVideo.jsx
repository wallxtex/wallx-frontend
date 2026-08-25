const HeroSectionVideo = () => {
  return (
    <div className="w-full py-8 md:py-12 flex items-center justify-center bg-black">
      {/* Full width container with increased height */}
      <div className="w-full h-96 md:h-[500px] lg:h-[650px] flex items-center justify-center">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/src/assets/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}

export default HeroSectionVideo
