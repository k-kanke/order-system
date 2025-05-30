
import type { GolfRoom } from '../types/MenuItem';
import { GolfRoomCard } from './GolfRoomCard'; // GolfRoomCardをインポート

interface GolfRoomGridProps {
  rooms: GolfRoom[]; // ゴルフ部屋の配列
  onBook: (room: GolfRoom) => void; // 予約ボタンが押されたときのハンドラ
}

export function GolfRoomGrid({ rooms, onBook }: GolfRoomGridProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', // カードのレイアウト
      gap: '1.5rem',
      padding: '1rem 0', // グリッドのpaddingを確保
    }}>
      {rooms.map(room => (
        <GolfRoomCard key={room.id} room={room} onBook={onBook} />
      ))}
      {/* スクロール可能にするためのダミー要素（必要に応じて削除） */}
      {/* <div style={{ height: '1px' }}></div> */}
    </div>
  );
}