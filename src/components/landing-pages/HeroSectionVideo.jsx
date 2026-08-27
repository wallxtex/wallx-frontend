import videoFile from '../../assets/video.mp4';

const HeroSectionVideo = () => {
  return (
    <div className="w-full py-8 md:py-12 flex items-center justify-center bg-black">
      {/* Expanded height container */}
      <div className="w-full h-96 md:h-[600px] lg:h-[700px] xl:h-[800px] flex items-center justify-center">
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
