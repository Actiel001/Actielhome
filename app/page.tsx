'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaDiscord, FaTiktok } from 'react-icons/fa';
import { ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Switch } from '@headlessui/react';
import { collectionData } from '@/data/collectionData';
import '../style/styles.css';
import Swal from "sweetalert2";
export default function Home() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const collectionRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault(); 
  
    if (!message.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Message cannot be empty!",
        timer: 1000,
        showConfirmButton: false,
      });
      return;
    }
  
    setPopupOpen(false);
    setMessage("");
  
    Swal.fire({
      icon: "info",
      title: "Sending...",
      text: "Please wait...",
      showConfirmButton: false,
      allowOutsideClick: false,
      timerProgressBar: true,
    });
  
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
  
      Swal.close();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Message sent successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Failed to send message. Try again.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong!",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };
  
  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

 

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const scrollToSection = (ref: any) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
<div className={`min-h-screen font-sans ${darkMode ? 'bg-[#141414] text-gray-200' : 'bg-gray-100 text-gray-900'}`}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <nav
className={`fixed top-0 left-0 w-full py-4 z-50 backdrop-blur-md ${
  darkMode ? 'bg-[#141414]/60 text-gray-200' : 'bg-white/50 shadow-md text-gray-900'
}`}
>
      <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex space-x-8">
            <button onClick={() => scrollToSection(homeRef)}>Home</button>
            <button onClick={() => scrollToSection(aboutRef)}>About</button>
            <button onClick={() => scrollToSection(collectionRef)}>Collection</button>
          </div>
          <Switch
  checked={darkMode}
  onChange={setDarkMode}
  className={`relative inline-flex h-6 w-28 items-center rounded-full transition-all duration-300 ${
    darkMode ? 'bg-blue-500 shadow-[0_0_10px_4px_rgba(255,255,255,0.8)]' : 'bg-gray-300'
  }`}
>
  <span className="sr-only">Toggle Dark Mode</span>

  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-full">
  <Image 
    src={darkMode ? "/asset/images3.gif" : "/asset/images2k.gif"} 
    alt="Mode Image"
    fill
    style={{ objectFit: 'cover' }}
    className="rounded-full"
    sizes="(max-width: 640px) 100vw, 50vw"
    priority 
  />
</div>
  <span
    className={`absolute left-1 top-1 h-4 w-4 transform rounded-full bg-white transition-all duration-300 ${
      darkMode ? 'translate-x-20 shadow-[0_0_10px_4px_rgba(255,255,255,0.8)]' : 'translate-x-0'
    }`}
  />
</Switch>
        </div>
      </nav>
      
      <section ref={homeRef} className="flex flex-col items-center justify-center h-screen text-center px-4"><br/>
        <h1 className="text-3xl md:text-4xl font-bold">Actiel Universe Port</h1>
        <p className="mt-2 text-lg">Hello, I am Actiel. I am a web developer as well as a student.</p>
        <div className="photo flex justify-center mt-8 mb-8">
  <Image
    src="/asset/meg1.png"
    alt="Foto Saya"
    width={130}
    height={130}
    className="rounded-full w-36 h-36 object-cover shadow-lg transition-all duration-300 custom-shadow"
  />
</div>


<div className="social-icons mt-6 flex justify-center gap-4">
      <button onClick={() => openLink("https://instagram.com/actiel001")} className="group">
        <FaInstagram className="social-icon text-2xl text-gray-800 dark:text-gray-200 transition-all group-hover:text-[#E4405F]" />
      </button>

      <button onClick={() => openLink("https://www.facebook.com/alif.alfarro.3/")} className="group">
        <FaFacebookF className="social-icon text-2xl text-gray-800 dark:text-gray-200 transition-all group-hover:text-[#1877F2]" />
      </button>

      <button onClick={() => openLink("https://x.com/Actiel001")} className="group">
        <FontAwesomeIcon icon={faXTwitter} className="social-icon text-2xl text-gray-800 dark:text-gray-200 transition-all group-hover:text-black" />
      </button>

      <button onClick={() => openLink("https://www.linkedin.com/in/andin-naila-rohmah-67b483349/")} className="group">
        <FaLinkedinIn className="social-icon text-2xl text-gray-800 dark:text-gray-200 transition-all group-hover:text-[#0077B5]" />
      </button>

      <button onClick={() => openLink("https://www.youtube.com/@actiel_universe")} className="group">
        <FaYoutube className="social-icon text-2xl text-gray-800 dark:text-gray-200 transition-all group-hover:text-[#FF0000]" />
      </button>

      <button onClick={() => openLink("https://discord.gg/vFxBRdYkVY")} className="group">
        <FaDiscord className="social-icon text-2xl text-gray-800 dark:text-gray-200 transition-all group-hover:text-[#7289DA]" />
      </button>

      <button onClick={() => openLink("https://www.tiktok.com/@actiel_universeau")} className="group">
        <FaTiktok className="social-icon text-2xl text-gray-800 dark:text-gray-200 transition-all group-hover:text-[#69C9D0]" />
      </button>
    </div>
      </section>

<section
ref={aboutRef}
className={`relative py-20 px-4 md:px-8 shadow-md text-center max-w-6xl mx-auto rounded-lg border-4 
  ${darkMode ? 'border-white animate-glow' : 'border-gray-300'} 
  bg-cover bg-center bg-no-repeat transition-all duration-500`}
>

<div
  className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${darkMode ? 'bg-[url("/asset/images3.gif")]' : 'bg-[url("/asset/images2k.gif")]'} opacity-30`}
></div>

<div className="relative z-10">
  <h2 className="text-2xl font-bold">About Me</h2>
  <p className="mt-4 leading-relaxed"> 
    Hello, I&apos;m Actiel Universe, a web developer from a parallel world called the Other World.
    I&apos;ve gone through 11 incarnations, and each life has led me to a deeper understanding of this world—including the digital world.
    Currently, I focus on frontend development, with expertise in modern technologies like React, Next.js, and other web tools.
  </p>
  <p className="mt-4">
    For me, every project is an opportunity to create a digital experience that not only works well but also brings pleasure to its users.
    Aside from working as a developer, I&apos;m also constantly learning to hone my skills. The tech world moves fast, and I always try to be at the forefront of developments.
  </p>
  <p className="mt-4">
    My mission in this world? To be a normal human being! Yes, you heard it right—HA.HA.HA.HA! The world is full of surprises, and I&apos;m ready to live life in the most human way possible.
    Feel free to explore my portfolio or contact me via social media. I&apos;d love to chat with you!
  </p>
  </div>

  <div className="absolute bottom-0 right-0 p-2">
        <Image src="/asset/h1.gif" alt="Animated" width={120} height={120} />
      </div>
</section><br/><br/><br/><br/>

<section
      ref={collectionRef}
      className={`relative py-16 px-4 text-center ${
        darkMode ? "bg-[#141414] text-gray-200" : "bg-gray-100 text-gray-900"
      } transition-all duration-500`}
    >
      <h2 className="text-2xl font-bold">This is my collection, you can click to show more.</h2>
      <br />
      <br />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 max-w-6xl mx-auto px-4">
        {collectionData.map(({ id, image, title, description, githubLink }) => (
          <div
            key={id}
            className={`${
              darkMode
                ? "bg-[#2D2F33] border border-gray-600"
                : "bg-[#f8f9fa] border border-gray-300"
            } p-4 rounded-xl shadow-md flex flex-col items-center cursor-pointer transition-transform hover:scale-105 hover:shadow-2xl`}
            onClick={() => window.open(githubLink, "_blank")}
          >
            <Image src={image} alt={title} width={100} height={100} className="rounded-md" />
            <p className={`mt-2 font-semibold ${darkMode ? "text-gray-200" : "text-gray-900"}`}>{title}</p>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-700"}`}>{description}</p>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 right-6">
  <button
    className={`relative w-16 h-16 rounded-full overflow-hidden transition-all flex items-center justify-center ${
      darkMode
        ? "bg-[#2D2F33] shadow-[0_0_15px_5px_rgba(255,255,255,0.6)]"
        : "bg-gray-300"
    }`}
    onClick={() => setPopupOpen(true)}
  >
    <Image
      src={darkMode ? "/asset/2.png" : "/asset/1.png"}
      alt="Message Button"
      fill
      className="absolute object-cover"
    />
  </button>
</div>


      {isPopupOpen && (
  <div className={`fixed bottom-20 right-6 p-4 rounded-lg shadow-xl w-80 sm:w-96 border transition-all ${
    darkMode
      ? "bg-[#1b1b1b] border-gray-700 text-white"
      : "bg-[#f5f5f5] border-gray-400 text-black"
  }`}>
    <div className={`flex justify-between items-center border-b pb-2 ${
      darkMode ? "border-white" : "border-black"
    }`}>
      <div className="flex items-center space-x-2">
        <h3 className={`text-base font-semibold ${darkMode ? "text-white" : "text-black"}`}>
          Send a Message
        </h3>
                <Image src="/asset/cat.gif" alt="Icon" width={50} height={50} />
      </div>
      <button
        onClick={() => setPopupOpen(false)}
        className={`text-xl font-bold transition ${
          darkMode ? "text-white hover:text-gray-300" : "text-black hover:text-red-600"
        }`}
      >
        &times;
      </button>
    </div>
    <textarea
      className={`w-full p-2 mt-3 border rounded-md h-24 ${
        darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-400"
      }`}
      placeholder="Write your message n u email ..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    ></textarea>
    <div className="flex w-full gap-2">
  <button
    className={`flex-1 px-4 py-2 rounded-md transition text-center ${
      darkMode
        ? "bg-gray-600 text-white hover:bg-gray-500"
        : "bg-gray-300 text-black hover:bg-gray-400"
    }`}
    onClick={() => setPopupOpen(false)}
  >
    Cancel
  </button>
  <button
    className={`flex-1 px-4 py-2 rounded-md transition text-center ${
      darkMode
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "bg-blue-500 text-black hover:bg-blue-600"
    }`}
    onClick={handleSubmit}
  >
    Send
  </button>
</div>

  </div>
)}

    </section>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
     

    </div>
  );
}
