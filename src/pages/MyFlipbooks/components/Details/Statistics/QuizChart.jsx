import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, LabelList, Tooltip } from 'recharts';
import { CircleCheck, XCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { getData } from '@/utils/datas';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    
    return (
      <div className="bg-gray-800 text-white p-3 rounded-md shadow-lg max-w-xs">
        <div className="flex items-center gap-2">
          {data.isCorrect ? (
            <CircleCheck size={18} className="text-green-400" />
          ) : (
            <XCircle size={18} className="text-red-400" />
          )}
          <p className="font-medium">{data.text}</p>
        </div>
        <p className="text-sm mt-1">{data.percentage}% ({data.count} vote{data.count !== 1 ? 's' : ''})</p>
      </div>
    );
  }

  return null;
};

export default function QuizChart (){
  const quizData = getData('quizData');

  const getBarColor = (isCorrect) => {
    return isCorrect ? "#d1e7dd" : "#f8d7da";
  };

  return (
    <div className="space-y-4 mt-4">
      {quizData.map(question => (
        <div key={question.id} className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">{question.id}. {question.question}</h3>
            <p className="text-sm text-gray-500">{question.correctResponses} / {question.totalResponses} correct responses</p>
          </div>
          
          <ResponsiveContainer width="100%" height={question.options.length * 80}>
            <BarChart
              data={question.options}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
              <YAxis 
                dataKey="text" 
                type="category" 
                width={150}
                tick={{ fontSize: 14 }}
              />
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={false} 
              />
              <Bar 
                dataKey="percentage" 
                barSize={40} 
                radius={[0, 4, 4, 0]}
              >
                {question.options.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.isCorrect)} />
                ))}
                <LabelList dataKey="percentage" position="insideRight" formatter={(value) => `${value}%`} style={{ fill: '#333', fontWeight: 'bold' }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          
          <div className="space-y-2">
            {question.options.map(option => (
              <div key={option.id} className="flex items-center gap-2">
                {option.isCorrect ? (
                  <CircleCheck size={20} className="text-green-600" />
                ) : (
                  <XCircle size={20} className="text-red-500" />
                )}
                <span className="font-medium">{option.text}</span>
                <span className="text-gray-500">{option.count} ({option.percentage}%)</span>
              </div>
            ))}
          </div>
          <Separator />
        </div>
      ))}
    </div>
  );
};
