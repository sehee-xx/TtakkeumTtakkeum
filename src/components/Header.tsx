import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const onClickLogo = () => {
    router.push('/');
  };

  const onClickDochiLife = () => {
    router.push('/dochiLife');
  };

  const onClickQnA = () => {
    router.push('/qna');
  };

  const onClickBestDochi = () => {
    router.push('/bestDochi');
  };

  const onClickSignin = () => {
    router.push('/signin');
  };

  const onClickSignup = () => {
    router.push('/signup');
  };

  return (
    <HeaderWrapper>
      <LogoText onClick={onClickLogo}>따끔따끔</LogoText>
      <HeaderMenu>
        <MenuText
          onClick={onClickDochiLife}
          active={pathname.includes('/dochiLife')}
        >
          도치의 일상
        </MenuText>
        <MenuText onClick={onClickQnA} active={pathname.includes('/qna')}>
          Q&A
        </MenuText>
        <ShowGeumchi
          onClick={onClickBestDochi}
          active={pathname.includes('/bestDochi')}
        >
          금주의 도치 보기
        </ShowGeumchi>
        {!isLoggedIn && (
          <>
            <MenuText
              onClick={onClickSignin}
              active={pathname.includes('/signin')}
            >
              로그인
            </MenuText>
            <MenuText
              onClick={onClickSignup}
              active={pathname.includes('/signup')}
            >
              회원가입
            </MenuText>
          </>
        )}
      </HeaderMenu>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 200px;
  background-color: #ffffff;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 1200px) {
    padding: 20px 100px;
  }

  @media (max-width: 768px) {
    padding: 20px 50px;
  }

  @media (max-width: 480px) {
    padding: 20px 20px;
  }
`;

const LogoText = styled.label`
  font-size: 30px;
  font-weight: 800;
  color: #d3a179;
  cursor: pointer;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const HeaderMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const MenuText = styled.label<{ active?: boolean }>`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => (props.active ? '#d3a179' : '#58595b')};
  cursor: pointer;

  &:hover {
    color: #d3a179;
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ShowGeumchi = styled.div<{ active?: boolean }>`
  width: 200px;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => (props.active ? '#d3a179' : '#58595b')};
  cursor: pointer;
  width: fit-content;

  &:hover {
    color: #d3a179;
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
