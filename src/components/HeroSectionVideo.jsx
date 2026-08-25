import videoFile from '../assets/video.mp4';

const HeroSectionVideo = () => {
  return (
    <div className="w-full py-12 md:py-16 flex items-center justify-center bg-black">
      {/* Medium size container - centered with proper height */}
      <div className="w-full h-80 md:h-[450px] lg:h-[550px] flex items-center justify-center">
        <video
          className="w-full h-full object-cover rounded-lg"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}

export default HeroSectionVideo
