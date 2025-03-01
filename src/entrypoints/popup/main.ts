import App from './components/App.svelte'
import 'tachyons/css/tachyons.min.css'
import './main.css'
import { mount } from 'svelte'

mount(App, { target: window.document.querySelector('main')! })
