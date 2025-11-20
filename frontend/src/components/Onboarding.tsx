import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Activity } from 'lucide-react';
import { api } from '../api';

export const Onboarding = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    stravaLink: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Get actual Telegram data
      const userPayload = {
        user_tg_id: 123456789, // Dummy ID
        user_tg_username: "test_user",
        user_email: formData.email,
        user_strava_link: formData.stravaLink
      };

      await api.createUser(userPayload);
      navigate('/home');
    } catch (error) {
      console.error(error);
      alert('Ошибка при сохранении профиля');
    }
  };

  return (
    <div className="container">
      <div style={{ marginTop: '40px', marginBottom: '40px' }}>
        <h1>Добро пожаловать! 👋</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Чтобы находить идеальных партнеров для бега, нам нужно немного больше информации.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: 12, top: 14, color: '#666' }} />
            <input
              type="email"
              className="input-field"
              style={{ paddingLeft: '40px' }}
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label>Ссылка на Strava (необязательно)</label>
          <div style={{ position: 'relative' }}>
            <Activity size={18} style={{ position: 'absolute', left: 12, top: 14, color: '#fc4c02' }} />
            <input
              type="url"
              className="input-field"
              style={{ paddingLeft: '40px' }}
              placeholder="https://www.strava.com/athletes/..."
              value={formData.stravaLink}
              onChange={(e) => setFormData({ ...formData, stravaLink: e.target.value })}
            />
          </div>
          <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            Мы подтянем вашу статистику для лучшего мэтчинга.
          </p>
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>
          Продолжить <ArrowRight size={20} />
        </button>
      </form>
    </div>
  );
};
