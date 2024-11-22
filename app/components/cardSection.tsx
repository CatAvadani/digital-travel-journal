import cardData from '../data/cardData';
import GlassCard from './glassCard';

export default function CardSection() {
  return (
    <div className='absolute -bottom-10 w-full flex justify-center gap-4'>
      {cardData.map((item) => (
        <GlassCard
          key={item.id}
          title={item.title}
          description={item.description}
          icon={item.icon}
        />
      ))}
    </div>
  );
}
