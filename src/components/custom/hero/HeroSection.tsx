import { useEffect, useState } from "react";
import { CrowdCanvas } from "./CrowdCanvas";
import { Button } from "@/components/ui/button";
import { ArrowBigRight } from "lucide-react";

const HeroSection = () => {
    const [rows, setRows] = useState(15)
    const [cols, setCols] = useState(7)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [])

    useEffect(() => {
        if (windowWidth > 1024) {
            setCols(7)
            setRows(15)
        } else if (windowWidth <= 1024 && windowWidth > 768) {
            setCols(6)
            setRows(12)

        } else {
            setCols(5)
            setRows(9)
        }

        console.log('Rows and Cols', rows, cols)


    }, [windowWidth])

    return (
        <div className="relative h-[90vh] bg-white text-black">
            {/* Branding */}
            <div className="z-20 absolute top-20 left-1/2 transform -translate-x-1/2 text-center">
                <h1 className="text-6xl  font-eraseoldyear">
                    SparkYume
                </h1>
                <p className="text-xl mt-4 opacity-60">
                    Ignite Ideas. Spark the Future.
                </p>
                {/* Get Started Button */}
                <Button
                    className="mt-8 px-12 py-6 text-lg text-white rounded-full transition cursor-pointer"
                    variant={'default'}
                >
                    <p>Get Started</p>
                    <ArrowBigRight />
                </Button>
            </div>

            {/* Background Canvas */}
            <div className="absolute bottom-0 w-full h-full">
                <CrowdCanvas src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/open-peeps-sheet.png" rows={rows} cols={cols} />
            </div>
        </div>
    );
};

export default HeroSection;
