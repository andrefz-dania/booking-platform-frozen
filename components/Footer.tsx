import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="w-full bg-primary px-4 py-16 mt-16">
            <div className="flex flex-col md:flex-row text-center md:text-left gap-8 mx-auto max-w-6xl place-content-between text-white">
                <div>
                    <Link href="/">
                <Image
                src="/logo-dark.svg"
                alt="logo"
                width={150}
                height={50}
                className="mx-auto my-4"
            ></Image>
            </Link>
                </div>
           
            <div>
                <h3 className="font-bold">ADRESSE</h3>
                <p>
                    Dansk Bridgefestival <br /> Svendborg Idrætscenter <br />
                    Ryttervej 70 DK-5700 Svendborg
                </p>
            </div>
            <div>
                <h3 className="font-bold">KONTAKT</h3>
                <p>
                    Danmarks Bridgeforbund <br />
                    4847 5213 <br />
                    dbf@bridge.dk <br />
                    www.bridge.dk <br />
                </p>
            </div>
            </div>
            <div className="text-white max-w-6xl mx-auto">
                <hr className="my-8"/>
                <p className="text-sm text-white/80">© 2026 Danmarks bridgeforbund. All rights reserved.</p>
            </div>
        </div>
    );
}
