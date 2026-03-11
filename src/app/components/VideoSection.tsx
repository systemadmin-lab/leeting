"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const VideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const cursorBtnRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  useEffect(() => {
    const wrapper = videoWrapperRef.current;
    const section = sectionRef.current;
    if (!wrapper || !section) return;

    /* Skip animations on mobile/small screens */
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      gsap.set(wrapper, { scale: 1, borderRadius: "12px", opacity: 1, y: 0 });
      return;
    }

    /* ── ScrollTrigger: scale the video container from small to full-width ── */
    const scaleTween = gsap.fromTo(
      wrapper,
      {
        scale: 0.5,
        borderRadius: "24px",
      },
      {
        scale: 1,
        borderRadius: "0px",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 10%",
          scrub: 1,
        },
      }
    );

    /* ── Fade in from below ── */
    const fadeTween = gsap.fromTo(
      wrapper,
      { opacity: 0.4, y: 60 },
      {
        opacity: 1,
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          end: "top 50%",
          scrub: 1,
        },
      }
    );

    return () => {
      scaleTween.scrollTrigger?.kill();
      fadeTween.scrollTrigger?.kill();
      scaleTween.kill();
      fadeTween.kill();
    };
  }, []);

  /* ── Cursor-following button ── */
  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = cursorBtnRef.current;
    const wrapper = videoWrapperRef.current;
    if (!btn || !wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(btn, {
      x: x - 48,
      y: y - 48,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseEnter = () => {
    isHovering.current = true;
    gsap.to(cursorBtnRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "back.out(2)",
    });
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    gsap.to(cursorBtnRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex items-center justify-center overflow-hidden py-12 md:py-24 lg:py-32"
      style={{
        background: "#FFFFFF",
      }}
    >
      {/* Video Container */}
      <div
        ref={videoWrapperRef}
        className="relative w-[calc(100%-40px)] md:w-[calc(100%-240px)] max-w-[1400px] overflow-hidden"
        style={{
          aspectRatio: "16 / 9",
          borderRadius: "24px",
          background: "#0E141C",
          boxShadow: "0 30px 80px rgba(14,20,28,0.15), 0 10px 30px rgba(14,20,28,0.1)",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* YouTube Video Embed */}
        <iframe
          className="absolute inset-0 w-full h-full"
          src="https://www.youtube.com/embed/vfSC07LBcTY?rel=0&modestbranding=1&showinfo=0"
          title="Intro Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ border: "none", borderRadius: "24px" }}
        />
      </div>
    </section>
  );
};

export default VideoSection;
