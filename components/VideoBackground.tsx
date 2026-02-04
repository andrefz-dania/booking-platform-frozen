export default function VideoBackground({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <div className="absolute inset-0 w-full md:h-[720px] md:min-h-[720px] overflow-hidden flex items-center">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full min-w-6xl"
            >
                <source src="bgvideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 w-full bg-black opacity-50">

            </div>
            <div className="absolute inset-0 mx-auto max-w-6xl z-10 flex items-center">
                <div className="flex flex-col gap-8">
                    {children}

                </div>
                </div>
        </div>
    );
}
