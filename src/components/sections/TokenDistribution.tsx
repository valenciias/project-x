import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "Community", value: 40 },
  { name: "Development", value: 25 },
  { name: "Marketing", value: 20 },
  { name: "Team", value: 15 }
];

const COLORS = ['hsl(144, 100%, 45%)', 'hsl(144, 100%, 35%)', 'hsl(144, 100%, 25%)', 'hsl(144, 100%, 15%)'];

export default function TokenDistribution() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tokenomics</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fair distribution ensuring long-term sustainability and growth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid gap-4"
          >
            {data.map((item, index) => (
              <Card key={index} className="bg-background/50 backdrop-blur">
                <CardContent className="p-4 flex justify-between items-center">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-primary">{item.value}%</span>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
