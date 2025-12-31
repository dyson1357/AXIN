import React from 'react';

type FactoryMonitoringReportProps = {
  onAnalyzeLine: () => void;
  onScheduleMaintenance: () => void;
};

const FactoryMonitoringReport: React.FC<FactoryMonitoringReportProps> = ({
  onAnalyzeLine,
  onScheduleMaintenance
}) => {
  return (
    <div className="factory-monitoring-report bg-white rounded-lg p-6 shadow">
      <h2 className="text-xl font-bold mb-4">공장 모니터링 에이전트의 분석 결과</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">생산 라인 상태 분석 보고서</h3>
        <p className="mb-2">현재 생산 라인 상태:</p>
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <p className="font-medium">현재 모든 생산 라인이 <span className="font-bold text-blue-600">정상 가동</span> 중입니다. 실시간 모니터링 시스템에서 수집된 데이터를 분석한 결과, 오늘의 전체 생산성은 어제 대비 <span className="font-bold text-green-600">2.3% 향상</span>되었습니다.</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">라인별 상태:</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-md">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 border-b text-left">라인</th>
                <th className="px-4 py-2 border-b text-left">가동률</th>
                <th className="px-4 py-2 border-b text-left">생산 목표 달성률</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b font-medium">라인 1</td>
                <td className="px-4 py-2 border-b">99.2%</td>
                <td className="px-4 py-2 border-b">103.5%</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b font-medium">라인 2</td>
                <td className="px-4 py-2 border-b">97.8%</td>
                <td className="px-4 py-2 border-b">99.1%</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b font-medium">라인 3</td>
                <td className="px-4 py-2 border-b">98.5%</td>
                <td className="px-4 py-2 border-b">101.2%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">생산 효율성 주기 (24시간)</h3>
        <p className="mb-3">지난 24시간 동안의 생산 효율성 데이터를 분석했습니다:</p>
        <div className="bg-gray-50 rounded-md p-3 mb-4">
          <img 
            src="https://quickchart.io/chart?c={type:'line',data:{labels:['00:00','03:00','06:00','09:00','12:00','15:00','18:00','21:00'],datasets:[{label:'생산 효율성',data:[85,78,82,95,98,92,86,89],fill:false,borderColor:'rgb(75,192,192)'},{label:'에너지 소비',data:[70,65,68,75,82,80,72,71],fill:false,borderColor:'rgb(255,99,132)'}]}}" 
            alt="생산 효율성 주기" 
            className="w-full rounded-md border border-gray-200"
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">주목할 점:</h3>
        <ul className="list-disc pl-5 space-y-2 bg-gray-50 p-4 rounded-lg">
          <li>오전 10시~12시 사이 <span className="font-medium">효율성 피크</span> 관측</li>
          <li>자정~새벽 2시 사이 <span className="font-medium">효율성 감소</span> 패턴 발견</li>
          <li>지난 3일 대비 <span className="font-medium">흐름대 개선</span> 추세 확인</li>
          <li>제안 사항</li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">라인 2의 일부 공정에서 불복 현상이 감지되었습니다. 직업 순서 최적화를 통해 개선 가능성이 있습니다.</h3>
        <p className="mb-3">새벽 시간대 효율성 감소에 대한 심층 분석을 수행하여 최적화할 것을 권장합니다.</p>
      </div>

      <div className="flex space-x-4 mb-6">
        <button 
          onClick={onAnalyzeLine}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          라인별 상세 분석
        </button>
        <button 
          onClick={onScheduleMaintenance}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          유지보수 일정 확인
        </button>
      </div>

      <div className="text-sm text-gray-500 italic mt-6">
        이 리포트는 공장 모니터링 에이전트가 주도하여 생산 데이터 분석 에이전트와 협업하여 작성되었습니다.
      </div>
    </div>
  );
};

export default FactoryMonitoringReport; 