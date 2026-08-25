import videoFile from '../assets/video.mp4';

const HeroSectionVideo = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      {/* Full width and full height container */}
      <div className="w-full h-full flex items-center justify-center">
        <video
          className="w-full h-full object-cover"
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
