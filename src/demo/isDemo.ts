/** Демо-режим включается параметром ?demo и живёт до перезагрузки (переходы внутри SPA его не теряют) */
export const isDemo = new URLSearchParams(window.location.search).has('demo')

/** Событие, по которому мок-данные возвращаются к исходным перед новым кругом демо */
export const DEMO_RESET_EVENT = 'demo:reset'
