import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

export const ZeroState = ({
    title = "No items found",
    description = "Get started by creating your first item"
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    // Add jumping animation for the logo
    const logoAnimationVariants = {
        animate: {
            y: [0, -15, 0],
            transition: {
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop"
            }
        }
    };

    return (
        <div className="w-full flex items-center justify-center py-16 px-4 h-full">
            {isVisible && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="flex flex-col items-center text-center"
                >
                    <motion.div
                        variants={itemVariants}
                        className="relative mb-6"
                    >
                        <motion.img 
                            src="/assets/book_logo.png" 
                            alt="Logo" 
                            className="w-auto h-12"
                            animate="animate"
                            variants={logoAnimationVariants}
                        />
                    </motion.div>

                    <motion.h3
                        variants={itemVariants}
                        className="text-3xl font-semibold text-primary mb-3"
                    >
                        {title}
                    </motion.h3>

                    <motion.p
                        variants={itemVariants}
                        className="text-primary/90 text-xl mb-8"
                    >
                        {description}
                    </motion.p>
                </motion.div>
            )}
        </div>
    );
};

export default ZeroState;