import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import Showcase from './Showcase'
import { screens } from './screens/registry'
import { CasesProvider } from './data/CasesContext'
import { ToastProvider } from './data/ToastContext'
import CaseDetail from './screens/case-detail/CaseDetail'
import CaseHistory from './screens/case-history/CaseHistory'
import { DemoPlayer } from './demo/DemoPlayer'

const dynamicScreenIds = new Set(['case-detail', 'case-detail-rejected', 'case-history'])

function App() {
  return (
    <CasesProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="/screens/case-detail/:caseId" element={<CaseDetail />} />
            <Route path="/screens/case-history/:caseId" element={<CaseHistory />} />
            {screens
              .filter((screen) => !dynamicScreenIds.has(screen.id))
              .map((screen) => (
                <Route key={screen.id} path={screen.route} element={<screen.component />} />
              ))}
          </Routes>
          <DemoPlayer />
        </BrowserRouter>
      </ToastProvider>
    </CasesProvider>
  )
}

export default App
