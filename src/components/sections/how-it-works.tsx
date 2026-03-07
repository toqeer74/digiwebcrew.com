"use client";

import { motion } from "framer-motion";
import { Container, Section } from "../layout/layout-primitives";
import { Search, PenTool, Code2, Rocket, HeartHandshake } from "lucide-react";
import { cn } from "@/lib/utils";

interface HowItWorksProps {
    dict: any;
}

const icons = [Search, PenTool, Code2, Rocket, HeartHandshake];
const colors = [
    "bg-blue-500",
    "bg-purple-600",
    "bg-raly-primary",
    "bg-amber-500",
    "bg-emerald-500"
];

const connectorColors = [
    "stroke-blue-400",
    "stroke-purple-400",
    "stroke-raly-primary",
    "stroke-amber-400"
];

export function HowItWorks({ dict }: HowItWorksProps) {
    const stepsData = dict.process.steps;
    const steps = Object.keys(stepsData).map((key, index) => ({
        id: index + 1,
        title: stepsData[key].title,
        desc: stepsData[key].desc,
        Icon: icons[index] || Code2,
        color: colors[index] || "bg-raly-primary",
    }));

    return (
        <Section className="bg-white dark:bg-midnight-950 relative overflow-hidden py-12 md:py-20">
            <Container>
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4"
                    >
                        How It Works?
                    </motion.h2>
                    <div className="w-20 h-1.5 mx-auto rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-amber-500" />
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {steps.map((step, index) => {
                        const isEven = index % 2 === 1;
                        const Icon = step.Icon;

                        return (
                            <div key={step.id} className="relative mb-20 last:mb-0">
                                {/* Connector SVG for Desktop */}
                                {index < steps.length - 1 && (
                                    <div className={cn(
                                        "hidden md:block absolute left-1/2 top-full h-20 w-48 -translate-x-1/2 z-0",
                                        isEven ? "-scale-x-100" : ""
                                    )}>
                                        <svg viewBox="0 0 100 100" className="w-full h-full fill-none overflow-visible">
                                            <motion.path
                                                initial={{ pathLength: 0, opacity: 0 }}
                                                whileInView={{ pathLength: 1, opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.5, delay: 0.5 }}
                                                d="M 50 0 C 50 50, 100 50, 100 100"
                                                className={cn("stroke-[2px] stroke-dashed", connectorColors[index] || "stroke-gray-200")}
                                                strokeDasharray="8 8"
                                            />
                                        </svg>
                                    </div>
                                )}

                                <div className={cn(
                                    "flex flex-col md:flex-row items-center gap-12 md:gap-24 relative z-10",
                                    isEven ? "md:flex-row-reverse" : ""
                                )}>
                                    {/* Visual Side */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8, x: isEven ? 50 : -50 }}
                                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="relative shrink-0"
                                    >
                                        <div className={cn(
                                            "w-40 h-40 md:w-52 md:h-52 rounded-full flex items-center justify-center p-6 relative",
                                            step.color
                                        )}>
                                            {/* Decorative outer ring */}
                                            <div className="absolute inset-0 rounded-full border-4 border-white opacity-20 scale-110" />

                                            {/* Inner visual (could be a phone mock, using icon for now) */}
                                            <div className="bg-white dark:bg-midnight-800 rounded-2xl w-full h-full shadow-2xl flex flex-col items-center justify-center p-4">
                                                <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center text-white mb-2", step.color)}>
                                                    <span className="font-black text-lg">SL</span>
                                                </div>
                                                <Icon className={cn("w-12 h-12", step.color.replace('bg-', 'text-'))} />
                                            </div>

                                            {/* Step Number Badge */}
                                            <div className={cn(
                                                "absolute top-6 -right-4 w-12 h-12 rounded-full border-4 border-white flex items-center justify-center text-white font-black text-xl shadow-lg",
                                                step.color,
                                                isEven ? "-left-4 right-auto" : "-right-4 left-auto"
                                            )}>
                                                {step.id}
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Content Side */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className={cn(
                                            "flex-1 text-center md:text-left",
                                            isEven ? "md:text-right" : ""
                                        )}
                                    >
                                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">{step.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                                            {step.desc}
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </Section>
    );
}
