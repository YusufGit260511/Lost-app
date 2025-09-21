import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  onAuthStateChanged,
  updateProfile,
  signOut,
  sendEmailVerification
} from 'firebase/auth';
import { auth } from '../../firebase.config';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiMessage, setApiMessage] = useState('');
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      if (u) {
        reset({
          displayName: u.displayName || '',
          photoURL: u.photoURL || ''
        });
      } else {
        navigate('/login', { replace: true });
      }
    });

    return () => unsub();
  }, [navigate, reset]);

  const onSave = async (data) => {
    if (!user) return;
    setApiMessage('');
    try {
      await updateProfile(user, {
        displayName: data.displayName || null,
        photoURL: data.photoURL || null
      });
      setUser({ ...auth.currentUser });
      setApiMessage('Профиль обновлён успешно');
    } catch (err) {
      setApiMessage(err.message || 'Ошибка при обновлении профиля');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login', { replace: true });
    } catch (err) {
      setApiMessage(err.message || 'Ошибка при выходе');
    }
  };

  const handleSendVerification = async () => {
    if (!user) return;
    setApiMessage('');
    try {
      await sendEmailVerification(user);
      setApiMessage('Письмо для подтверждения отправлено. Проверьте вашу почту.');
    } catch (err) {
      setApiMessage(err.message || 'Не удалось отправить письмо подтверждения');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Загрузка...</div>
      </div>
    );
  }

  const providers = (user.providerData || []).map((p) => p.providerId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="w-36 h-36 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shadow">
              {user.photoURL ? (
                <img src={user.photoURL} alt="User avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="text-4xl text-gray-400">{(user.displayName || user.email || 'U')[0].toUpperCase()}</div>
              )}
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-800 text-center">{user.displayName || 'No name'}</h3>
            <p className="mt-1 text-sm text-gray-500 text-center">{user.email}</p>

            <div className="mt-4 w-full">
              <div className="text-xs text-gray-500 mb-1">Провайдеры</div>
              <div className="flex flex-wrap gap-2">
                {providers.length ? providers.map((p) => (
                  <span key={p} className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                    {p.replace('.com', '')}
                  </span>
                )) : (
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">email/password</span>
                )}
              </div>


              <div className="mt-4">
                <button
                  onClick={handleSignOut}
                  className="w-full py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  Sign out
                </button>
              </div>

              {!user.emailVerified && (
                <div className="mt-3">
                  <button
                    onClick={handleSendVerification}
                    className="w-full py-2 rounded-xl border border-[#0e82fd] text-[#0e82fd] hover:bg-[#0e82fd]/5 transition-colors text-sm font-medium"
                  >
                    Send verification email
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit profile</h2>

            <form onSubmit={handleSubmit(onSave)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Display name</label>
                <input
                  type="text"
                  {...register('displayName')}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-[#0e82fd] focus:border-[#0e82fd]"
                />
                {errors.displayName && <p className="mt-1 text-sm text-red-600">{errors.displayName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Photo URL</label>
                <input
                  type="url"
                  {...register('photoURL')}
                  placeholder="https://..."
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-[#0e82fd] focus:border-[#0e82fd]"
                />
                {errors.photoURL && <p className="mt-1 text-sm text-red-600">{errors.photoURL.message}</p>}
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-xl bg-[#0e82fd] text-white font-medium hover:bg-[#0e82fd]/90 transition-colors"
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={() => {
                    reset({
                      displayName: user.displayName || '',
                      photoURL: user.photoURL || ''
                    });
                    setApiMessage('');
                  }}
                  className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>

              {apiMessage && <div className="mt-2 text-sm text-green-600">{apiMessage}</div>}

              <div className="mt-4 text-sm text-gray-500">
                <div><strong>UID:</strong> {user.uid}</div>
                <div className="mt-2"><strong>Email verified:</strong> {user.emailVerified ? 'Yes' : 'No'}</div>
              </div>

              <div className="mt-6 text-xs text-gray-400">
                Совет: если хочешь хранить дополнительные поля (например userType: doctor/patient),
                добавь Firestore collection `users` и сохраняй/читай данные там. Могу помочь добавить это.
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Profile;
