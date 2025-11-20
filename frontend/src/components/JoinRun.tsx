import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Ruler, Filter } from 'lucide-react';
import { api } from '../api';

interface ActivityData {
    _id: string;
    activity_name: string;
    activity_type: string;
    activity_option: string;
    activity_start_time: string;
    activity_metric: string;
    activity_distance: number;
    activity_date?: string;
    activity_week_day?: string;
    activity_start_point_link?: string;
    activity_city?: string;
    activity_country?: string;
}

export const JoinRun = () => {
    const navigate = useNavigate();
    const [activities, setActivities] = useState<ActivityData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Filter States
    const [selectedCountry, setSelectedCountry] = useState<string>('All');
    const [selectedCity, setSelectedCity] = useState<string>('All');
    const [selectedType, setSelectedType] = useState<string>('All');

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const data = await api.getActivities();
                setActivities(data);
            } catch (err) {
                console.error(err);
                setError('Не удалось загрузить список пробежек');
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);

    // Extract Unique Options
    const countries = useMemo(() => {
        const unique = new Set(activities.map(a => a.activity_country).filter(Boolean));
        return ['All', ...Array.from(unique)];
    }, [activities]);

    const cities = useMemo(() => {
        const filteredByCountry = selectedCountry === 'All'
            ? activities
            : activities.filter(a => a.activity_country === selectedCountry);
        const unique = new Set(filteredByCountry.map(a => a.activity_city).filter(Boolean));
        return ['All', ...Array.from(unique)];
    }, [activities, selectedCountry]);

    const types = useMemo(() => {
        const unique = new Set(activities.map(a => a.activity_type));
        return ['All', ...Array.from(unique)];
    }, [activities]);

    // Filter Logic
    const filteredActivities = useMemo(() => {
        return activities.filter(act => {
            const matchCountry = selectedCountry === 'All' || act.activity_country === selectedCountry;
            const matchCity = selectedCity === 'All' || act.activity_city === selectedCity;
            const matchType = selectedType === 'All' || act.activity_type === selectedType;
            return matchCountry && matchCity && matchType;
        });
    }, [activities, selectedCountry, selectedCity, selectedType]);

    const formatDate = (act: ActivityData) => {
        if (act.activity_option === 'recurring') {
            return `Каждый ${act.activity_week_day}`;
        }
        return act.activity_date || 'Дата не указана';
    };

    const formatLocation = (act: ActivityData) => {
        if (act.activity_city && act.activity_country) {
            return `${act.activity_city}, ${act.activity_country}`;
        }
        return act.activity_city || act.activity_country || 'Локация';
    };

    return (
        <div className="container" style={{ paddingBottom: '80px' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px',
                position: 'sticky',
                top: 0,
                background: 'var(--bg-color)',
                paddingTop: '16px',
                paddingBottom: '16px',
                zIndex: 10
            }}>
                <button
                    onClick={() => navigate('/home')}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        marginRight: '16px',
                        padding: '8px',
                        marginLeft: '-8px'
                    }}
                >
                    <ArrowLeft size={24} />
                </button>
                <h2 style={{ margin: 0 }}>Присоединиться</h2>
            </div>

            {/* Filters */}
            <div style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '16px',
                marginBottom: '8px',
                scrollbarWidth: 'none'
            }}>
                <select
                    value={selectedCountry}
                    onChange={(e) => { setSelectedCountry(e.target.value); setSelectedCity('All'); }}
                    className="input"
                    style={{ minWidth: '120px', padding: '8px' }}
                >
                    {countries.map(c => <option key={c} value={c}>{c === 'All' ? 'Все страны' : c}</option>)}
                </select>

                <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="input"
                    style={{ minWidth: '120px', padding: '8px' }}
                >
                    {cities.map(c => <option key={c} value={c}>{c === 'All' ? 'Все города' : c}</option>)}
                </select>

                <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="input"
                    style={{ minWidth: '120px', padding: '8px' }}
                >
                    {types.map(t => <option key={t} value={t}>{t === 'All' ? 'Все типы' : t}</option>)}
                </select>
            </div>

            {/* List */}
            {loading ? (
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '40px' }}>
                    Загрузка...
                </div>
            ) : error ? (
                <div style={{ textAlign: 'center', color: '#ef4444', marginTop: '40px' }}>
                    {error}
                </div>
            ) : filteredActivities.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '40px' }}>
                    Нет пробежек по выбранным фильтрам.
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {filteredActivities.map((act) => (
                        <div
                            key={act._id}
                            className="card"
                            style={{ cursor: 'pointer' }}
                            onClick={() => window.open(act.activity_start_point_link || '#', '_blank')}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                                <h3 style={{ margin: 0, fontSize: '18px' }}>{act.activity_name}</h3>
                                <span style={{
                                    fontSize: '12px',
                                    background: 'rgba(59, 130, 246, 0.1)',
                                    color: 'var(--primary)',
                                    padding: '4px 8px',
                                    borderRadius: '12px'
                                }}>
                                    {act.activity_type}
                                </span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Calendar size={16} />
                                    <span>{formatDate(act)}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Clock size={16} />
                                    <span>{act.activity_start_time}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Ruler size={16} />
                                    <span>{act.activity_distance} {act.activity_metric}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <MapPin size={16} />
                                    <span>{formatLocation(act)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
