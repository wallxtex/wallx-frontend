import videoFile from '../../assets/landingpage.mp4';

const HeroSectionVideo = () => {
  return (
    <div className="relative w-full overflow-hidden bg-black">
      {/* Responsive height for different screen sizes */}
      <div className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}

export default HeroSectionVideo
