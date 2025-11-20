import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Activity, Calendar, Clock } from 'lucide-react';
import { api } from '../api';

export const Organize = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<'choice' | 'manual' | 'strava'>('choice');

    // Manual Form State
    const [formData, setFormData] = useState({
        name: '',
        type: 'Run',
        option: 'once',
        metric: 'km',
        distance: '',
        date: '',
        time: '',
        startLink: ''
    });

    const handleManualSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // TODO: Get actual user ID from context/storage
            const activityPayload = {
                activity_name: formData.name,
                activity_type: formData.type,
                activity_option: formData.option,
                activity_start_time: formData.time,
                activity_metric: formData.metric,
                activity_distance: parseFloat(formData.distance),
                activity_total_elevation_gain: 0, // Default for now
                activity_start_point_link: formData.startLink,
                activity_date: formData.date,
                creator_user_tg_id: 123456789 // Dummy ID
            };

            await api.createActivity(activityPayload);
            alert('Пробежка создана!');
            navigate('/home');
        } catch (error) {
            console.error(error);
            alert('Ошибка при создании');
        }
    };

    if (mode === 'choice') {
        return (
            <div className="container">
                <button onClick={() => navigate('/home')} style={{ background: 'none', border: 'none', color: 'white', marginBottom: '20px', cursor: 'pointer' }}>
                    <ArrowLeft /> Назад
                </button>
                <h1>Создать пробежку 🏃‍♂️</h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
                    <button className="card" onClick={() => setMode('strava')} style={{ textAlign: 'left', cursor: 'pointer', border: '1px solid #fc4c02' }}>
                        <h3 style={{ color: '#fc4c02', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Activity size={20} /> Импорт из Strava
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                            Вставьте ссылку на активность, и мы подтянем трек, дистанцию и темп.
                        </p>
                    </button>

                    <button className="card" onClick={() => setMode('manual')} style={{ textAlign: 'left', cursor: 'pointer', border: '1px solid #333' }}>
                        <h3>✍️ Вручную</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                            Заполните все параметры сами: дистанция, время, место старта.
                        </p>
                    </button>
                </div>
            </div>
        );
    }

    if (mode === 'manual') {
        return (
            <div className="container">
                <button onClick={() => setMode('choice')} style={{ background: 'none', border: 'none', color: 'white', marginBottom: '20px', cursor: 'pointer' }}>
                    <ArrowLeft /> Назад
                </button>
                <h1>Новая пробежка</h1>

                <form onSubmit={handleManualSubmit}>
                    <div className="input-group">
                        <label>Название</label>
                        <input
                            className="input-field"
                            placeholder="Утренняя пробежка в парке"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="input-group">
                            <label>Тип</label>
                            <select
                                className="input-field"
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="Run">Run</option>
                                <option value="Trail run">Trail run</option>
                                <option value="Walk">Walk</option>
                                <option value="Hike">Hike</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Повтор</label>
                            <select
                                className="input-field"
                                value={formData.option}
                                onChange={e => setFormData({ ...formData, option: e.target.value })}
                            >
                                <option value="once">Один раз</option>
                                <option value="recurring">Еженедельно</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
                        <div className="input-group">
                            <label>Ед. изм.</label>
                            <select
                                className="input-field"
                                value={formData.metric}
                                onChange={e => setFormData({ ...formData, metric: e.target.value })}
                            >
                                <option value="km">км</option>
                                <option value="mile">мили</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Дистанция</label>
                            <input
                                type="number"
                                className="input-field"
                                placeholder="5.0"
                                value={formData.distance}
                                onChange={e => setFormData({ ...formData, distance: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="input-group">
                            <label><Calendar size={14} /> Дата</label>
                            <input
                                type="date"
                                className="input-field"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label><Clock size={14} /> Время</label>
                            <input
                                type="time"
                                className="input-field"
                                value={formData.time}
                                onChange={e => setFormData({ ...formData, time: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label><MapPin size={14} /> Точка старта (Google Maps Link)</label>
                        <input
                            className="input-field"
                            placeholder="https://maps.google.com/..."
                            value={formData.startLink}
                            onChange={e => setFormData({ ...formData, startLink: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>
                        Создать
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="container">
            <button onClick={() => setMode('choice')} style={{ background: 'none', border: 'none', color: 'white', marginBottom: '20px', cursor: 'pointer' }}>
                <ArrowLeft /> Назад
            </button>
            <h1>Импорт из Strava</h1>
            <div className="card" style={{ border: '1px solid #fc4c02' }}>
                <div className="input-group">
                    <label>Ссылка на активность</label>
                    <input
                        className="input-field"
                        placeholder="https://www.strava.com/activities/..."
                    />
                </div>
                <button className="btn" style={{ backgroundColor: '#fc4c02', color: 'white' }}>
                    Загрузить данные
                </button>
            </div>
        </div>
    );
};
