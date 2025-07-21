'use client';

import { useState } from 'react';
import { sendApplicationNotification } from '@/actions/waitlist';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      await sendApplicationNotification({ contact: email });
      setIsSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Pre-registration Section */}
      <section className="bg-custom-cream py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="mb-6">
            <span className="text-3xl font-bold text-gradient-footer mb-6">
              답변이 궁금하다면?
              <br />
              사전 신청하고,
              <br />
              출시 알림 받기
            </span>
            <span className="text-3xl mb-6"> 📩</span>
          </p>

          <p className="text-gray-700 text-lg mb-4 font-bold">
            반려인들의 걱정을 덜어드리고자,
            <br />
            고품질의 서비스를 만들기 위해 준비하고 있어요
          </p>

          <p className="text-gray-600 text-base mb-8">
            사전 신청해주신 분들에게 안내드릴게요
            <br />
            펫쏙쏙을 응원해주세요 !
          </p>

          {isSubmitted ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              이메일 등록이 완료되었습니다! 출시 소식을 보내드릴게요 😊
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="petss@gmail.com"
                  className="w-full max-w-xs mx-auto px-8 py-4 text-center text-gray-600 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading || !email.trim()}
                className="w-full max-w-xs mx-auto font-medium px-8 py-6 rounded-full text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed h-16">
                {isLoading ? '등록 중...' : '사전 신청 등록하기'}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* Original Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Main Footer Content */}
          <div className="space-y-8 mb-8">
            {/* Company Info */}
            <div className="text-left">
              <h3 className="text-xl font-bold bg-gradient-to-r from-green-300 to-cyan-500 bg-clip-text text-transparent mb-4">
                펫쏙쏙
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                반려동물과 함께하는 건강한 생활을 위한 맞춤형 상담 서비스
              </p>
            </div>

            {/* Contact & Links */}
            <div className="text-left">
              <h4 className="text-lg font-semibold mb-4">문의 및 뉴스레터</h4>
              <div className="flex flex-col justify-left space-y-2 text-gray-300 text-sm">
                <p>문의: msjantler@gmail.com</p>
                <p className="text-gray-400">
                  출시 알림 및 업데이트 소식을 이메일로 받아보세요
                </p>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  이용약관
                </a>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  개인정보처리방침
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
              <p>© 2025 펫쏙쏙. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
