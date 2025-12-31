import React from 'react';

type MaintenanceReportProps = {
  onScheduleAdjust: () => void;
  onViewDetails: () => void;
};

const MaintenanceReport: React.FC<MaintenanceReportProps> = ({
  onScheduleAdjust,
  onViewDetails
}) => {
  return (
    <div className="maintenance-report bg-white rounded-lg p-6 shadow">
      <h2 className="text-xl font-bold mb-4">설비 유지보수 일정 분석</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">예정된 유지보수</h3>
        <p className="mb-2">AI 유지보수 최적화 시스템에 따르면, 다음 주 화요일(5일 후)에 <span className="font-bold text-blue-600">압출기 #2</span>의 정기 점검이 예정되어 있습니다.</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">설비별 가동률</h3>
        <div className="bg-gray-50 rounded-md p-3 mb-4">
          <img 
            src="https://quickchart.io/chart?c={type:'bar',data:{labels:['압출기 #1','압출기 #2','사출기 #1','사출기 #2','조립라인'],datasets:[{label:'가동률 (%)',data:[98.3,94.8,91.2,97.5,99.1],backgroundColor:['rgba(75,192,192,0.6)','rgba(255,159,64,0.6)','rgba(255,205,86,0.6)','rgba(75,192,192,0.6)','rgba(75,192,192,0.6)']}]}}" 
            alt="설비 가동률" 
            className="w-full rounded-md border border-gray-200"
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">설비 상태 심층 분석</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-md">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 border-b text-left">설비</th>
                <th className="px-4 py-2 border-b text-left">가동률</th>
                <th className="px-4 py-2 border-b text-left">건강 점수</th>
                <th className="px-4 py-2 border-b text-left">다음 유지보수</th>
                <th className="px-4 py-2 border-b text-left">상태</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b font-medium">압출기 #1</td>
                <td className="px-4 py-2 border-b">98.3%</td>
                <td className="px-4 py-2 border-b">92/100</td>
                <td className="px-4 py-2 border-b">12일 후</td>
                <td className="px-4 py-2 border-b"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">정상</span></td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b font-medium">압출기 #2</td>
                <td className="px-4 py-2 border-b">94.8%</td>
                <td className="px-4 py-2 border-b">79/100</td>
                <td className="px-4 py-2 border-b">5일 후</td>
                <td className="px-4 py-2 border-b"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">유지보수 필요</span></td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b font-medium">사출기 #1</td>
                <td className="px-4 py-2 border-b">91.2%</td>
                <td className="px-4 py-2 border-b">85/100</td>
                <td className="px-4 py-2 border-b">8일 후</td>
                <td className="px-4 py-2 border-b"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">주의 관찰</span></td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b font-medium">사출기 #2</td>
                <td className="px-4 py-2 border-b">97.5%</td>
                <td className="px-4 py-2 border-b">89/100</td>
                <td className="px-4 py-2 border-b">15일 후</td>
                <td className="px-4 py-2 border-b"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">정상</span></td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b font-medium">조립라인</td>
                <td className="px-4 py-2 border-b">99.1%</td>
                <td className="px-4 py-2 border-b">94/100</td>
                <td className="px-4 py-2 border-b">19일 후</td>
                <td className="px-4 py-2 border-b"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">정상</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">예측 유지보수 인사이트</h3>
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <h4 className="font-bold mb-2">압출기 #2:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>베어링 교체 필요 (마모도 78%)</li>
            <li>냉각 시스템 청소 권장 (효율 65%)</li>
            <li>예상 점검 시간: 4시간</li>
          </ul>

          <h4 className="font-bold mb-2 mt-4">사출기 #1:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>온도 센서 보정 필요 (편차 +3.2°C)</li>
            <li>노즐 점검 권장 (압력 변동 감지)</li>
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">최적화 제안</h3>
        <p className="mb-2">현재 생산 일정과 설비 상태를 고려할 때, <span className="font-bold text-blue-600">압출기 #2</span>의 유지보수를 <span className="font-bold text-blue-600">수요일(6일 후)</span>로 조정하면 생산 효율성이 2.3% 향상될 것으로 예측됩니다.</p>
      </div>

      <div className="flex space-x-4 mb-6">
        <button 
          onClick={onScheduleAdjust}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          일정 조정하기
        </button>
        <button 
          onClick={onViewDetails}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          유지보수 상세 내역
        </button>
      </div>

      <div className="text-sm text-gray-500 italic mt-6">
        이 리포트는 유지보수 계획 에이전트가 주도하여 데이터 분석 에이전트와 협업하여 작성되었습니다.
      </div>
    </div>
  );
};

export default MaintenanceReport; 