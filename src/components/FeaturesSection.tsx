import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Activity, Award } from "lucide-react";

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-blue-500" />,
      title: "AI 분석",
      description: "개인 맞춤형 AI 자세 분석",
    },
    {
      icon: <Activity className="w-8 h-8 text-green-500" />,
      title: "운동 추천",
      description: "데이터 기반 교정 운동 제공",
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-500" />,
      title: "목표 달성",
      description: "꾸준한 습관 형성을 통한 성취",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12">주요 기능</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {features.map((feature, index) => (
          <Card key={index} className="p-6 rounded-2xl shadow-md">
            <CardContent className="flex flex-col items-center text-center">
              {feature.icon}
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
