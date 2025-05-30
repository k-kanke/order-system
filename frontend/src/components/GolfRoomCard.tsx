import type { GolfRoom } from "../types/MenuItem";



interface GolfRoomCardProps {
    room: GolfRoom;
    onBook: (room: GolfRoom) => void; // 予約ボタンが押されたときのハンドラ
}

export function GolfRoomCard({ room, onBook }: GolfRoomCardProps) {
    return (
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1rem',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        {room.imageUrl && (
          <img
            src={room.imageUrl}
            alt={room.name}
            style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', marginBottom: '1rem' }}
          />
        )}
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{room.name}</h3>
        <p style={{ fontSize: '1.2rem', color: room.isAvailable ? 'green' : 'red', fontWeight: 'bold' }}>
          {room.isAvailable ? '現在空いています' : '現在使用中'}
        </p>
        <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
          1時間あたりの料金: ¥{room.pricePerHour.toLocaleString()}
        </p>
        <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '1rem' }}>{room.description}</p>
        <button
          onClick={() => onBook(room)}
          disabled={!room.isAvailable} // 空いていない場合は予約できない
          style={{
            backgroundColor: room.isAvailable ? '#007bff' : '#ccc',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: room.isAvailable ? 'pointer' : 'not-allowed',
            fontSize: '1rem',
            fontWeight: 'bold',
            marginTop: 'auto', // 下部に配置
          }}
        >
          {room.isAvailable ? 'この部屋を予約する' : '予約できません'}
        </button>
      </div>
    );
  }