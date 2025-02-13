// src/components/PlayerInfo.tsx
const PlayerInfo = ({ avatar, nickname, balance, health }: { avatar: string; nickname: string; balance: number; health: number }) => (
  <div className="flex items-center gap-4 mt-4">
    <img src={avatar} alt="Avatar" className="w-16 h-16 rounded-full border-2 border-white" />
    <div>
      <h2 className="text-xl font-bold">{nickname}</h2>
      <div className="flex gap-4 mt-2 text-sm">
        <span>현재 잔액：{balance}</span>
        <span>신용점수：{health}</span>
      </div>
    </div>
  </div>
);

export default PlayerInfo;
