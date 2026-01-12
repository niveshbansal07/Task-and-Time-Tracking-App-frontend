import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default {
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/api': {
				target: 'https://task-and-time-tracking-app-backend.onrender.com',
				changeOrigin: true,
				secure: false
			}
		}
	}
};
