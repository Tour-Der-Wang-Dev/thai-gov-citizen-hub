import { 
  FileText, 
  TrendingUp, 
  Heart
} from "lucide-react";
import { useAppStore } from "@/stores/useAppStore";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const stats = [
  {
    label: "บริการออนไลน์",
    labelEn: "Online Services",
    value: "12",
    icon: FileText,
    change: "+2"
  },
  {
    label: "คำขอที่ดำเนินการ",
    labelEn: "Processed Requests",
    value: "1,247",
    icon: TrendingUp,
    change: "+156"
  },
  {
    label: "ประชาชนที่ใช้บริการ",
    labelEn: "Citizens Served",
    value: "8,932",
    icon: Heart,
    change: "+324"
  }
];

export function QuickStats() {
  const language = useAppStore((state) => state.language);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-3 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div key={index} variants={itemVariants}>
            <Card className="text-center border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4">
                <Icon className="h-6 w-6 text-government-green mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">
                  {language === "th" ? stat.label : stat.labelEn}
                </div>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {stat.change}
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}