import Image from "next/image";
import Link from "next/link";


const Hero = () => {


    return (
        <section className="relative bg-gray-900 min-h-screen flex justify-center items-center">

            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d"
                    alt="Courier delivery"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/70" />
            </div>

            <div className="relative px-4 py-20  max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                        Fast & Reliable Courier Services
                    </h1>

                    <p className="mt-4 text-base text-gray-300 sm:text-lg">
                        Track your parcel in real time or book a new delivery in minutes.
                    </p>



                    {/* CTA */}
                    <div className="flex justify-center mt-6">
                        <Link
                            href="/book-parcel"
                            className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-indigo-600 bg-white rounded-md hover:bg-gray-100"
                        >
                            Book a Parcel
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
