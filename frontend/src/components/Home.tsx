import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, PlusCircle } from 'lucide-react';

export const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="container" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '32px' }}>Ayda Run 🏃‍♂️</h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Найди компанию или создай свою пробежку.
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <button
                    className="card"
                    style={{
                        border: '1px solid #333',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'transform 0.1s',
                        width: '100%'
                    }}
                    onClick={() => navigate('/join')}
                >
                    <div style={{
                        background: 'rgba(59, 130, 246, 0.1)',
                        padding: '12px',
                        borderRadius: '50%',
                        color: 'var(--primary)'
                    }}>
                        <Users size={32} />
                    </div>
                    <div>
                        <h3 style={{ margin: '0 0 4px 0' }}>Присоединиться</h3>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                            Найти пробежки рядом с вами
                        </span>
                    </div>
                </button>

                <button
                    className="card"
                    style={{
                        border: '1px solid #333',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'transform 0.1s',
                        width: '100%'
                    }}
                    onClick={() => navigate('/organize')}
                >
                    <div style={{
                        background: 'rgba(245, 158, 11, 0.1)',
                        padding: '12px',
                        borderRadius: '50%',
                        color: 'var(--accent)'
                    }}>
                        <PlusCircle size={32} />
                    </div>
                    <div>
                        <h3 style={{ margin: '0 0 4px 0' }}>Организовать</h3>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                            Создать событие и позвать людей
                        </span>
                    </div>
                </button>
            </div>
        </div>
    );
};
