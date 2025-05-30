
import type { GolfRoom } from '../types/MenuItem';

interface BookingModalProps {
  room: GolfRoom;
  onClose: () => void;
}

export function BookingModal({ room, onClose }: BookingModalProps) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // モーダル背景
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10000, // 他の要素より手前に
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
          }}
        >
          ✖
        </button>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{room.name}の予約</h2>
        <p style={{ marginBottom: '1rem' }}>
          **料金:** ¥{room.pricePerHour.toLocaleString()} / 時間
        </p>
        <p style={{ marginBottom: '1rem' }}>
          **部屋の説明:** {room.description}
        </p>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
          予約枠のイメージ（ホットペッパーのようなカレンダー表示）
        </h3>
        <div style={{
          backgroundColor: '#f8f8f8',
          border: '1px dashed #ccc',
          padding: '1.5rem',
          minHeight: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#888',
          textAlign: 'center',
        }}>
          <p>ここに時間帯ごとの予約カレンダーやスロットが表示されます。</p>
          <p>(※この部分は実際の予約システムとの連携が必要です)</p>
          {/* 例: 実際の予約枠は以下のようなコンポーネントになる想定 */}
          {/* <TimeSlotPicker roomId={room.id} /> */}
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: '2rem',
            backgroundColor: '#007bff',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            width: '100%',
          }}
        >
          閉じる
        </button>
      </div>
    </div>
  );
}