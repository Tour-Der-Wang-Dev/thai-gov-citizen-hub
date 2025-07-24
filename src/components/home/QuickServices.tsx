import { 
  CreditCard, 
  FileText, 
  MessageSquare, 
  Building
} from "lucide-react";
import { useAppStore } from "@/stores/useAppStore";
import ServiceCard from "@/components/ServiceCard";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const quickServices = [
  {
    title: "ชำระภาษี",
    titleEn: "Tax Payment",
    description: "ชำระภาษีท้องถิ่น ภาษีป้าย ค่าธรรมเนียมต่างๆ",
    descriptionEn: "Pay local taxes, signage tax, and various fees",
    icon: CreditCard,
    status: "active" as const
  },
  {
    title: "ขออนุญาต",
    titleEn: "Permit Request",
    description: "ขออนุญาตก่อสร้าง ดัดแปลง รื้อถอนอาคาร",
    descriptionEn: "Request building, renovation, demolition permits",
    icon: Building,
    status: "active" as const
  },
  {
    title: "แจ้งปัญหา",
    titleEn: "Report Issue",
    description: "แจ้งปัญหาในพื้นที่ ไฟฟ้า น้ำประปา ถนน",
    descriptionEn: "Report local issues: electricity, water, roads",
    icon: MessageSquare,
    status: "active" as const
  },
  {
    title: "ใบรับรอง",
    titleEn: "Certificates",
    description: "ขอใบรับรองการพำนัก หนังสือรับรองต่างๆ",
    descriptionEn: "Request residence certificates and documents",
    icon: FileText,
    status: "new" as const
  }
];

export function QuickServices() {
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
    <div>
      <h3 className="text-xl font-semibold mb-4 text-foreground">
        {language === "th" ? "บริการด่วน" : "Quick Services"}
      </h3>
      <motion.div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {quickServices.map((service, index) => (
          <motion.div key={index} variants={itemVariants}>
            <ServiceCard
              title={service.title}
              titleEn={service.titleEn}
              description={service.description}
              descriptionEn={service.descriptionEn}
              icon={service.icon}
              status={service.status}
              language={language}
              onClick={() => {
                console.log(`Service clicked: ${service.title}`);
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}