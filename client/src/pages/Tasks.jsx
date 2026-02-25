import { useEffect, useState } from 'react';
import api from '../api/http';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/user/tasks').then((res) => setTasks(res.data.tasks));
  }, []);

  const complete = async (taskId) => {
    const { data } = await api.post('/user/tasks/complete', { taskId });
    setMessage(data.message);
  };

  return <div><h1 className="mb-4 text-3xl font-bold">Tasks</h1><div className="mb-5 rounded bg-white p-3">Offerwall iframe placeholder</div>{message && <p className="mb-3 text-green-700">{message}</p>}<div className="grid gap-4 md:grid-cols-2">{tasks.map((task) => <div key={task.id} className="rounded bg-white p-4 shadow"><h3 className="font-semibold">{task.title}</h3><p>Reward: {task.rewardAmount}</p><p>Estimated time: {task.estimatedTime}</p><p>Category: {task.category}</p><button onClick={() => complete(task.id)} className="mt-3 rounded bg-accent px-4 py-2 text-white">Complete Task</button></div>)}</div></div>;
}
