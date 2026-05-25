import React from 'react';

interface BoonIconProps {
  iconName: string;
  upgradeId?: string;
  className?: string;
}

export const BoonIcon: React.FC<BoonIconProps> = ({ iconName, upgradeId, className = 'w-10 h-10' }) => {
  switch (upgradeId) {
    case 'pawn-diagonal':
      return (
        <svg className={className} viewBox="16 17 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 18L19.4444 22.6667L21.2778 24.2222H23.7222L25.5556 22.6667L28 18" stroke="#FFBB00"/>
          <path d="M23 26H22V23.3333H23V26Z" stroke="#FFBB00"/>
          <path d="M22.5 23.3333V26" stroke="#FF0000"/>
        </svg>
      );
    case 'pawn-double':
      return (
        <svg className={className} viewBox="10 32 24 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 33V39H34V37.5L33 35.5H27.5V33H24Z" fill="#683900" stroke="#683900"/>
          <path d="M24 39V40" stroke="#4B2900"/>
          <path d="M26 39V40" stroke="#4B2900"/>
          <path d="M28 39V40" stroke="#4B2900"/>
          <path d="M30 39V40" stroke="#4B2900"/>
          <path d="M32 39V40" stroke="#4B2900"/>
          <path d="M34 39V40" stroke="#4B2900"/>
          <path d="M24.5 34H28" stroke="#FFCC00"/>
          <path d="M25 37.5H26" stroke="#FF0000"/>
          <path d="M28 37.5H29" stroke="#11FF00"/>
          <path d="M31 37.5H32" stroke="#4400FF"/>
          <path d="M21 33V39H11V37.5L12 35.5H17.5V33H21Z" fill="#683900" stroke="#683900"/>
          <path d="M21 39V40" stroke="#4B2900"/>
          <path d="M19 39V40" stroke="#4B2900"/>
          <path d="M17 39V40" stroke="#4B2900"/>
          <path d="M15 39V40" stroke="#4B2900"/>
          <path d="M13 39V40" stroke="#4B2900"/>
          <path d="M11 39V40" stroke="#4B2900"/>
          <path d="M20.5 34H17" stroke="#FFCC00"/>
          <path d="M20 37.5H19" stroke="#FF0000"/>
          <path d="M17 37.5H16" stroke="#11FF00"/>
          <path d="M14 37.5H13" stroke="#4400FF"/>
        </svg>
      );
    case 'pawn-backstep':
      return (
        <svg className={className} viewBox="10 9 8 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 25H16V13L14.5 10L13 13V25Z" fill="#767676"/>
          <path d="M13 13L14.5 10L16 13V25H13V13ZM13 13V25.5" stroke="#767676"/>
          <path d="M14.5 12V24M14.5 24L13.5 25M14.5 24L15.5 25" stroke="#545454"/>
          <path d="M14 26V30H15V26H14Z" fill="#B06100" stroke="#B06100"/>
          <path d="M14 27H15" stroke="#935100"/>
          <path d="M14 29.5H15" stroke="#935100"/>
          <path d="M11 25L12.5 25.5H16.5L17.5 25" stroke="#683900"/>
        </svg>
      );
    case 'pawn-sidestep':
      return (
        <svg className={className} viewBox="13 28 18 3" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 30L14.5 29L14 29.5L20 30.5H25L31 29.5L30.5 29L25 30H20Z" stroke="#935100"/>
          <path d="M21 29.5V31L24 29.5V31" stroke="#515151"/>
        </svg>
      );
    case 'pawn-capture-forward':
      return (
        <svg className={className} viewBox="18 1 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M26 10H19V9L21 8H24L26 9V10Z" fill="#FFF200" stroke="#FFF200"/>
          <path d="M21 8.5V9.5" stroke="#FFBB00"/>
          <path d="M24 8.5V9.5" stroke="#FFBB00"/>
          <path d="M22.9805 3.8623L23.9805 7.3623L24.1631 8H20.8369L21.0195 7.3623L22.0195 3.8623L22.5 2.17969L22.9805 3.8623Z" fill="#D9D9D9" stroke="#AEABAB"/>
        </svg>
      );
    case 'pawn-triple':
      return (
        <svg className={className} viewBox="17 10 11 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 11.5H27" stroke="#FF0000" strokeLinecap="round"/>
          <path d="M18 12H27" stroke="#FF5900" strokeLinecap="round"/>
          <path d="M18 12.5H27" stroke="#FFF200" strokeLinecap="round"/>
          <path d="M25.6484 11.4726C25.6484 11.8242 26 11.8828 26 12.1758C26 12.2929 25.8828 12.4687 25.7071 12.4687C25.5313 12.4687 25.4141 12.2929 25.5312 11.9999C25.3554 12.1171 25.2969 12.2343 25.2969 12.3515C25.2969 12.6445 25.5898 12.9374 26 12.9374C26.4102 12.9374 26.7031 12.7617 26.7031 12.4101C26.7057 11.8901 26.1039 11.7163 25.9414 11.4726C25.8242 11.2968 25.8828 11.1796 25.9999 11.0624C25.7656 11.121 25.6484 11.2851 25.6484 11.4726Z" fill="black"/>
          <path d="M23.6484 11.4726C23.6484 11.8242 24 11.8828 24 12.1758C24 12.2929 23.8828 12.4687 23.7071 12.4687C23.5313 12.4687 23.4141 12.2929 23.5312 11.9999C23.3554 12.1171 23.2969 12.2343 23.2969 12.3515C23.2969 12.6445 23.5898 12.9374 24 12.9374C24.4102 12.9374 24.7031 12.7617 24.7031 12.4101C24.7057 11.8901 24.1039 11.7163 23.9414 11.4726C23.8242 11.2968 23.8828 11.1796 23.9999 11.0624C23.7656 11.121 23.6484 11.2851 23.6484 11.4726Z" fill="black"/>
          <path d="M20.6484 11.4726C20.6484 11.8242 21 11.8828 21 12.1758C21 12.2929 20.8828 12.4687 20.7071 12.4687C20.5313 12.4687 20.4141 12.2929 20.5312 11.9999C20.3554 12.1171 20.2969 12.2343 20.2969 12.3515C20.2969 12.6445 20.5898 12.9374 21 12.9374C21.4102 12.9374 21.7031 12.7617 21.7031 12.4101C21.7057 11.8901 21.1039 11.7163 20.9414 11.4726C20.8242 11.2968 20.8828 11.1796 20.9999 11.0624C20.7656 11.121 20.6484 11.2851 20.6484 11.4726Z" fill="black"/>
          <path d="M18.6484 11.4726C18.6484 11.8242 19 11.8828 19 12.1758C19 12.2929 18.8828 12.4687 18.7071 12.4687C18.5313 12.4687 18.4141 12.2929 18.5312 11.9999C18.3554 12.1171 18.2969 12.2343 18.2969 12.3515C18.2969 12.6445 18.5898 12.9374 19 12.9374C19.4102 12.9374 19.7031 12.7617 19.7031 12.4101C19.7057 11.8901 19.1039 11.7163 18.9414 11.4726C18.8242 11.2968 18.8828 11.1796 18.9999 11.0624C18.7656 11.121 18.6484 11.2851 18.6484 11.4726Z" fill="black"/>
        </svg>
      );
    case 'knight-teleport':
      return (
        <svg className={className} viewBox="15 20 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M38 28.5L33.5 31H24L20.5 28.5L16.5 32.5L19.5 36L24 38.5H33.5L37 36L39 34L38 28.5Z" fill="#515151" stroke="#515151"/>
          <path d="M20 29L24 31.5H33.5L37.5 29.5" stroke="#1C1C1C"/>
          <path d="M17 32.5L19.5 35.5L24 38H33.5L38.5 34.5" stroke="#1C1C1C"/>
          <path d="M21.5 27L24.5 29H33.5L38 26L37 21.5L33.5 24H24.5L22.5 23L21.5 27Z" fill="#515151" stroke="#515151"/>
          <path d="M37.5 26L33.5 28.5H24L22 27" stroke="#1C1C1C"/>
          <path d="M37 22.5L33.5 25H24.5L23 24" stroke="#1C1C1C"/>
          <path d="M24 26.5H25" stroke="#D900FF"/>
          <path d="M28 26.5H29" stroke="#D900FF"/>
          <path d="M32 26.5H33" stroke="#D900FF"/>
          <path d="M20 32.5H21" stroke="#D900FF"/>
          <path d="M26 34.5H27" stroke="#D900FF"/>
          <path d="M33 33.5H34" stroke="#D900FF"/>
        </svg>
      );
    case 'knight-mirror':
      return (
        <svg className={className} viewBox="28 22 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M43 30C43 27.6667 41.6 23 36 23C30.4 23 29 27.6667 29 30C29 32.3333 30.4 37 36 37C41.6 37 43 32.3333 43 30Z" fill="#E8E8E8" stroke="#AEABAB"/>
          <path d="M34.8333 28.8333L37.1667 31.1667" stroke="#2D2D2D"/>
          <path d="M37.1667 28.8333L34.8333 31.1667" stroke="#2D2D2D"/>
        </svg>
      );
    case 'knight-charge':
      return (
        <svg className={className} viewBox="1 1 8 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.20711 25.0299L4.70711 0.0299461L6.20711 25.0299L7.20711 29.5299L8.20711 30.5299H1.20711L2.20711 29.5299L3.20711 25.0299Z" fill="#484848" stroke="#484848"/>
          <path d="M4.20711 31.0299V37.0299H5.20711V31.0299" stroke="#543700"/>
          <path d="M3.70711 32.0299H5.70711" stroke="#CE8600"/>
          <path d="M3.70711 35.0299H5.70711" stroke="#CE8600"/>
          <path d="M3.70711 37.5299H5.70711" stroke="#CE8600"/>
          <path d="M1.70711 29.0299L7.20711 27.0299" stroke="#3C3C3C"/>
          <path d="M2.70711 25.0299L6.70711 23.5299" stroke="#3C3C3C"/>
          <path d="M2.70711 21.5299L6.70711 19.5299" stroke="#3C3C3C"/>
          <path d="M3.20711 17.0299L6.20711 16.0299" stroke="#3C3C3C"/>
          <path d="M3.20711 13.0299L6.20711 12.0299" stroke="#3C3C3C"/>
          <path d="M3.70711 9.02995L5.70711 8.02995" stroke="#3C3C3C"/>
          <path d="M4.20711 5.02995L5.20711 4.02995" stroke="#3C3C3C"/>
        </svg>
      );
    case 'knight-wide':
      return (
        <svg className={className} viewBox="13 32 26 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M29 33V39H39V37.5L38 35.5H32.5V33H29Z" fill="#D900FF" stroke="#683900"/>
          <path d="M29 39V40" stroke="#4B2900"/>
          <path d="M31 39V40" stroke="#4B2900"/>
          <path d="M33 39V40" stroke="#4B2900"/>
          <path d="M35 39V40" stroke="#4B2900"/>
          <path d="M37 39V40" stroke="#4B2900"/>
          <path d="M39 39V40" stroke="#4B2900"/>
          <path d="M24 33V39H14V37.5L15 35.5H20.5V33H24Z" fill="#D900FF" stroke="#683900"/>
          <path d="M24 39V40" stroke="#4B2900"/>
          <path d="M22 39V40" stroke="#4B2900"/>
          <path d="M20 39V40" stroke="#4B2900"/>
          <path d="M18 39V40" stroke="#4B2900"/>
          <path d="M16 39V40" stroke="#4B2900"/>
          <path d="M14 39V40" stroke="#4B2900"/>
        </svg>
      );
    case 'bishop-hop':
      return (
        <svg className={className} viewBox="4 25 36 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 38L16 26H29L40 38L34 40L28.5 38L24 40L19 38L13 40L5 38Z" fill="#3C3C3C" stroke="#3C3C3C"/>
          <path d="M28.5 26.5H16.5L6 38L13 39.5L19 37.5L24 39.5L28.5 37.5L34 39.5L38.5 38L28.5 26.5Z" stroke="#2C2C2C"/>
          <path d="M12 39L22.5 27L34 39L22.5 33L12 39Z" stroke="#2C2C2C"/>
        </svg>
      );
    case 'bishop-orthogonal':
      return (
        <svg className={className} viewBox="9 34 26 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 35L13.5 36V38L13 39" stroke="#FFCC00"/>
          <path d="M10 35L10.5 36V38L10 39" stroke="#FFCC00"/>
          <path d="M10 37H11" stroke="#4400FF"/>
          <path d="M13 37H14" stroke="#4400FF"/>
          <path d="M32 35L31.5 36V38L32 39" stroke="#FFCC00"/>
          <path d="M35 35L34.5 36V38L35 39" stroke="#FFCC00"/>
          <path d="M35 37H34" stroke="#4400FF"/>
          <path d="M32 37H31" stroke="#4400FF"/>
        </svg>
      );
    case 'bishop-ethereal':
      return (
        <svg className={className} viewBox="31.5 4 11 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M37.5 36H36.5V13H37.5V36Z" stroke="#935100"/>
          <path d="M37 15V16" stroke="#FF5252"/>
          <path d="M37 19V20" stroke="#FF5252"/>
          <path d="M37 23V24" stroke="#FF5252"/>
          <path d="M37 27V28" stroke="#FF5252"/>
          <path d="M37 31V32" stroke="#FF5252"/>
          <path d="M37 35V36" stroke="#FF5252"/>
          <path d="M34 11L37 13.5L40 11L37 5L34 11Z" fill="#FF0000"/>
          <path d="M33 8L32 7M37 13.5L34 11L37 5L40 11L37 13.5Z" stroke="#FF0000"/>
          <path d="M35 6L34 5" stroke="#FF0000"/>
          <path d="M39 6L40 5" stroke="#FF0000"/>
          <path d="M41 8L42 7" stroke="#FF0000"/>
          <path d="M37 13V5" stroke="#FF5252"/>
          <path d="M34 11H40" stroke="#FF5252"/>
        </svg>
      );
    case 'bishop-extended':
      return (
        <svg className={className} viewBox="21 11 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M27 21.1667C29.3012 21.1667 31.1667 19.3012 31.1667 17C31.1667 14.6988 29.3012 12.8333 27 12.8333C24.6988 12.8333 22.8333 14.6988 22.8333 17C22.8333 19.3012 24.6988 21.1667 27 21.1667Z" stroke="#C061CB" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M29.1655 15.75C29.124 15.6782 29.079 15.6087 29.0308 15.5417" stroke="#C061CB" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M29.4213 17.625C29.1951 18.5035 28.5035 19.1951 27.625 19.4213" stroke="#C061CB" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M30.985 16C31.845 20.9029 31.1323 22.8178 30.6685 23.1624" stroke="#C061CB"/>
        </svg>
      );
    case 'rook-hop':
      return (
        <svg className={className} viewBox="18.5 16 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="22.5" cy="24.5" r="3.5" fill="#FFCC00"/>
          <path d="M22.5 17L21.5 19H23.5L22.5 17Z" fill="#FFCC00" stroke="#FFCC00"/>
          <path d="M22.5 32L21.5 30H23.5L22.5 32Z" fill="#FFCC00" stroke="#FFCC00"/>
        </svg>
      );
    case 'rook-diagonal':
      return (
        <svg className={className} viewBox="6 35 32 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.5 37C26.535 37 30.2078 37.0749 32.8896 37.1982C34.2231 37.2596 35.3535 37.3347 36.1709 37.4235C36.5727 37.4672 36.959 37.5205 37.2646 37.5892C37.5266 37.6481 38 37.7801 38 38C38 38.2199 37.5266 38.3519 37.2646 38.4108C36.959 38.4795 36.5727 38.5328 36.1709 38.5765C35.3535 38.6653 34.2231 38.7404 32.8896 38.8018C30.2078 38.9251 26.535 39 22.5 39C18.465 39 14.7922 38.9251 12.1104 38.8018C10.7769 38.7404 9.64647 38.6653 8.8291 38.5765C8.42734 38.5328 8.04101 38.4795 7.73535 38.4108C7.47335 38.3519 7 38.2199 7 38C7 37.7801 7.47335 37.6481 7.73535 37.5892C8.04101 37.5205 8.42734 37.4672 8.8291 37.4235C9.64647 37.3347 10.7769 37.2596 12.1104 37.1982C14.7922 37.0749 18.465 37 22.5 37Z" fill="#C16A00"/>
          <circle cx="10" cy="38" r="2" fill="#683900"/>
          <circle cx="15" cy="38" r="2" fill="#683900"/>
          <circle cx="20" cy="38" r="2" fill="#683900"/>
          <circle cx="30" cy="38" r="2" fill="#683900"/>
          <circle cx="25" cy="38" r="2" fill="#683900"/>
          <circle cx="35" cy="38" r="2" fill="#683900"/>
        </svg>
      );
    case 'rook-diagonal-full':
      return (
        <svg className={className} viewBox="10 11 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M34.5 12H10.5V14H34.5V12Z" fill="#BCBCBC" stroke="#D9D9D9"/>
          <path d="M12 13H13" stroke="#11FF00"/>
          <path d="M14 13H15" stroke="#11FF00"/>
          <path d="M16 13H17" stroke="#11FF00"/>
          <path d="M18 13H19" stroke="#11FF00"/>
          <path d="M20 13H21" stroke="#11FF00"/>
          <path d="M22 13H23" stroke="#11FF00"/>
          <path d="M24 13H25" stroke="#11FF00"/>
          <path d="M26 13H27" stroke="#11FF00"/>
          <path d="M28 13H29" stroke="#11FF00"/>
          <path d="M30 13H31" stroke="#11FF00"/>
          <path d="M32 13H33" stroke="#11FF00"/>
          <path d="M33.5 32.5H11.5V34.5H33.5V32.5Z" fill="#BCBCBC" stroke="#D9D9D9"/>
          <path d="M13 33.5H14" stroke="#11FF00"/>
          <path d="M15 33.5H16" stroke="#11FF00"/>
          <path d="M17 33.5H18" stroke="#11FF00"/>
          <path d="M19 33.5H20" stroke="#11FF00"/>
          <path d="M21 33.5H22" stroke="#11FF00"/>
          <path d="M23 33.5H24" stroke="#11FF00"/>
          <path d="M25 33.5H26" stroke="#11FF00"/>
          <path d="M27 33.5H28" stroke="#11FF00"/>
          <path d="M29 33.5H30" stroke="#11FF00"/>
          <path d="M31 33.5H32" stroke="#11FF00"/>
        </svg>
      );
    case 'king-jump':
      return (
        <svg className={className} viewBox="14 4 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 13H15V6H17L18 7.5H21V5.5C21 4 24 4 24 5.5V7.5L27 7.5L28 6H30V13Z" fill="#FFCC00" stroke="#FFCC00"/>
          <circle cx="22.5" cy="6" r="1.5" fill="#FF0000"/>
          <path d="M23.5 12V9" stroke="black"/>
          <path d="M25 9.5H23" stroke="black"/>
          <path d="M21.5 12V9" stroke="black"/>
          <path d="M20 9.5H22" stroke="black"/>
          <path d="M18.5 12V10" stroke="black"/>
          <path d="M16 10.5H19" stroke="black"/>
          <path d="M26.5 12V10" stroke="black"/>
          <path d="M29 10.5H26" stroke="black"/>
        </svg>
      );
    case 'king-double-step':
      return (
        <svg className={className} viewBox="9 28 24 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.5 31L14.6818 33.5L19.9091 34H25.1364L29.3182 33.5L33.5 31" stroke="#FFCC00"/>
          <path d="M22.5 34L25.0981 39.25H19.9019L22.5 34Z" fill="#E4B600"/>
          <path d="M22.5 35L24.2321 38.75H20.7679L22.5 35Z" fill="#D900FF"/>
        </svg>
      );
    case 'king-blink':
      return (
        <svg className={className} viewBox="5 14 34 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.5 29C15.1684 25.9801 17.0789 23.3678 17.5 17L16.5 16C15.3399 22.3447 13.4988 24.9864 8 28L9.5 29Z" fill="#D9D9D9" stroke="#AEABAB"/>
          <path d="M7.26316 26C12.0366 23.4447 13.6454 21.2343 14 15.8462L13.1579 15C12.181 20.3686 10.6306 22.6038 6 25.1538L7.26316 26Z" fill="#D9D9D9" stroke="#AEABAB"/>
          <path d="M14 24.5L15 23.5" stroke="#11FF00"/>
          <path d="M11 22.5L12 21.5" stroke="#11FF00"/>
          <path d="M35.5 29C29.8316 25.9801 27.9211 23.3678 27.5 17L28.5 16C29.6601 22.3447 31.5012 24.9864 37 28L35.5 29Z" fill="#D9D9D9" stroke="#AEABAB"/>
          <path d="M37.7368 26C32.9634 23.4447 31.3546 21.2343 31 15.8462L31.8421 15C32.819 20.3686 34.3694 22.6038 39 25.1538L37.7368 26Z" fill="#D9D9D9" stroke="#AEABAB"/>
          <path d="M31 24.5L30 23.5" stroke="#11FF00"/>
          <path d="M34 22.5L33 21.5" stroke="#11FF00"/>
        </svg>
      );
    case 'king-shield':
      return (
        <svg className={className} viewBox="18 16 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="22.5" cy="24.5" r="3.5" fill="#FFCC00"/>
          <path d="M20.5 20L22.5 21L24.5 20V17H20.5V20Z" fill="#D9D9D9" stroke="#FFCC00"/>
          <path d="M20.5 29L22.5 28L24.5 29V32H20.5V29Z" fill="#D9D9D9" stroke="#FFCC00"/>
        </svg>
      );
    case 'queen-hop':
      return (
        <svg className={className} viewBox="33 8 9 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="38" cy="12.5" r="4.5" fill="#FF5E00"/>
          <path d="M37 12.5L38 13.5L39 12.5L38 11.5L37 12.5Z" fill="#FF0000" stroke="#FF0000"/>
          <path d="M37 19L38 18L39 19V36L38 37L37 36V19Z" fill="#FFCC00" stroke="#FFCC00"/>
        </svg>
      );
    case 'queen-extra-capture':
      return (
        <svg className={className} viewBox="5 8 8 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 30.7903H10V13.7581L8.5 9.5L7 13.7581V30.7903Z" fill="#FFCC00"/>
          <path d="M7 13.7581L8.5 9.5L10 13.7581V30.7903H7V13.7581ZM7 13.7581V31.5" stroke="#FFF200"/>
          <path d="M8.5 12.5V29.1154M8.5 29.1154L7.5 30.5M8.5 29.1154L9.5 30.5" stroke="#CBA200"/>
          <path d="M8 32V36H9V32H8Z" fill="#AEABAB" stroke="#AEABAB"/>
          <path d="M8 33H9" stroke="#FFCC00"/>
          <path d="M8 35.5H9" stroke="#FFCC00"/>
          <path d="M5 31L6.5 31.5H10.5L11.5 31" stroke="#808080"/>
        </svg>
      );
    case 'queen-ghost':
      return (
        <svg className={className} viewBox="3 5 40 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.625 8.25H13.6261M14.375 8.25H14.3761M13.125 8.25C13.125 7.76675 13.5168 7.375 14 7.375C14.4833 7.375 14.875 7.76675 14.875 8.25V9.625L14.7729 9.5569C14.6757 9.4921 14.6271 9.45971 14.5756 9.45056C14.5303 9.4425 14.4836 9.44712 14.4407 9.46392C14.392 9.48297 14.3507 9.52427 14.2681 9.60687C14.2581 9.61689 14.2419 9.61687 14.2319 9.60687C14.1755 9.55065 14.1444 9.52107 14.111 9.50455C14.0411 9.46989 13.9589 9.46989 13.889 9.50455C13.8557 9.52107 13.8245 9.55065 13.2681 9.60687C13.2581 9.61687 13.2419 9.61689 13.2319 9.60687C13.1493 9.52427 13.108 9.48297 13.0593 9.46392C13.0164 9.44712 12.9697 9.4425 12.9244 9.45056C12.8729 9.45971 12.8243 9.4921 12.7272 9.5569L12.625 9.625V8.25" stroke="#3584E4" strokeWidth="0.3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M30.625 8.75H30.6261M31.375 8.75H31.3761M30.125 8.75C30.125 8.26675 30.5168 7.875 31 7.875C31.4833 7.875 31.875 8.26675 31.875 8.75V10.125L31.7729 10.0569C31.6757 9.9921 31.6271 9.95971 31.5756 9.95056C31.5303 9.9425 31.4836 9.94712 31.4407 9.96392C31.392 9.98297 31.3507 10.0243 31.2681 10.1069C31.2581 10.1169 31.2419 10.1169 31.2319 10.1069C31.1755 10.0506 31.1444 10.0211 31.111 10.0045C31.0411 9.96989 30.9589 9.96989 30.889 10.0045C30.8557 10.0211 30.8245 10.0506 30.7681 10.1069C30.7581 10.1169 30.7419 10.1169 30.7319 10.1069C30.6493 10.0243 30.608 9.98297 30.5593 9.96392C30.5164 9.94712 30.4697 9.9425 30.4244 9.95056C30.3729 9.95971 30.3243 9.9921 30.2272 10.0569L30.125 10.125V8.75" stroke="#3584E4" strokeWidth="0.3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M38.625 11.75H38.6261M39.375 11.75H39.3761M38.125 11.75C38.125 11.2668 38.5168 10.875 39 10.875C39.4833 10.875 39.875 11.2668 39.875 11.75V13.125L39.7729 13.0569C39.6757 12.9921 39.6271 12.9597 39.5756 12.9506C39.5303 12.9425 39.4836 12.9471 39.4407 12.9639C39.392 12.983 39.3507 13.0243 39.2681 13.1069C39.2581 13.1169 39.2419 13.1169 39.2319 13.1069C39.1755 13.0506 39.1444 13.0211 39.111 13.0045C39.0411 12.9699 38.9589 12.9699 38.889 13.0045C38.8557 13.0211 38.8245 13.0506 38.7681 13.1069C38.7581 13.1169 38.7419 13.1169 38.7319 13.1069C38.6493 13.0243 38.608 12.983 38.5593 12.9639C38.5164 12.9471 38.4697 12.9425 38.4244 12.9506C38.3729 12.9597 38.3243 12.9921 38.2272 13.0569L38.125 13.125V11.75" stroke="#3584E4" strokeWidth="0.3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.625 11.75H5.62613M6.375 11.75H6.37613M5.125 11.75C5.125 11.2668 5.51675 10.875 6 10.875C6.48325 10.875 6.875 11.2668 6.875 11.75V13.125L6.77285 13.0569C6.67565 12.9921 6.62706 12.9597 6.57563 12.9506C6.53026 12.9425 6.48356 12.9471 6.44066 12.9639C6.39203 12.983 6.35073 13.0243 6.26813 13.1069C6.25811 13.1169 6.24189 13.1169 6.23186 13.1069C6.17549 13.0506 6.14435 13.0211 6.111 13.0045C6.04106 12.9699 5.95894 12.9699 5.889 13.0045C5.85565 13.0211 5.82451 13.0506 5.76814 13.1069C5.75811 13.1169 5.74189 13.1169 5.73188 13.1069C5.64928 13.0243 5.60798 12.983 5.55934 12.9639C5.51644 12.9471 5.46974 12.9425 5.42438 12.9506C5.37294 12.9597 5.32434 12.9921 5.22715 13.0569L5.125 13.125V11.75" stroke="#3584E4" strokeWidth="0.3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22.125 7.25H22.1261M22.875 7.25H22.8761M21.625 7.25C21.625 6.76675 22.0168 6.375 22.5 6.375C22.9833 6.375 23.375 6.76675 23.375 7.25V8.625L23.2729 8.5569C23.1757 8.4921 23.1271 8.45971 23.0756 8.45056C23.0303 8.4425 22.9836 8.44712 22.9407 8.46392C22.892 8.48297 22.8507 8.52427 22.7681 8.60687C22.7581 8.61689 22.7419 8.61687 22.7319 8.60687C22.6755 8.55065 22.6444 8.52107 22.611 8.50455C22.5411 8.46989 22.4589 8.46989 22.389 8.50455C22.3557 8.52107 22.3245 8.55065 22.2681 8.60687C22.2581 8.61687 22.2419 8.61689 22.2319 8.60687C22.1493 8.52427 22.108 8.48297 22.0593 8.46392C22.0164 8.44712 21.9697 8.4425 21.9244 8.45056C21.8729 8.45971 21.8243 8.4921 21.7272 8.5569L21.625 8.625V7.25" stroke="#3584E4" strokeWidth="0.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return <FallbackIcon iconName={iconName} className={className} />;
  }
};

const FallbackIcon: React.FC<{ iconName: string; className: string }> = ({ iconName, className }) => {
  switch (iconName) {
    case 'Compass':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" className="stroke-slate-700 fill-slate-900/40" />
          <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" className="stroke-emerald-400 fill-emerald-500/10" />
        </svg>
      );
    case 'Flame':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2c1 2 2 4.5 2 7.5S11 15 11 18s2.5 4 2.5 4" className="stroke-emerald-400" />
          <path d="M10 4.5c2 2 4 4.5 4 8.5s-4 7-4 9" className="stroke-emerald-500" />
          <path d="M14 6c-2 3-2.5 5.5-2 8s.5 4 .5 6" className="stroke-teal-400" />
        </svg>
      );
    case 'ChevronsDown':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v14M9 16h6" className="stroke-slate-500" strokeWidth="2" />
          <polygon points="12,23 9,16 15,16" className="stroke-blue-400 fill-blue-500/20" />
          <path d="M10 5l2-3 2 3" className="stroke-blue-300" />
        </svg>
      );
    case 'Radio':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 10a8 8 0 0 1 16 0c0 4.4-4 8-8 11-4-3-8-6.6-8-11z" className="stroke-blue-400 fill-blue-905/30" />
          <circle cx="12" cy="10" r="3" className="stroke-indigo-400 fill-indigo-900/50" />
        </svg>
      );
    case 'Shield':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" className="stroke-cyan-400 fill-cyan-950/20" />
          <line x1="12" y1="2.5" x2="12" y2="21.5" className="stroke-cyan-300/40" />
          <line x1="4.5" y1="11" x2="19.5" y2="11" className="stroke-cyan-300/40" />
        </svg>
      );
    case 'Ghost':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18.68 12c.08-.65.12-1.32.12-2a6.8 6.8 0 0 0-13.6 0c0 .68.04 1.35.12 2A2.72 2.72 0 0 1 3 14.4V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4.6a2.72 2.72 0 0 1-2.32-2.4z" className="stroke-purple-400 fill-purple-950/20" />
          <circle cx="9" cy="11" r="1" className="fill-purple-300" />
          <circle cx="15" cy="11" r="1" className="fill-purple-300" />
          <path d="M10 15h4" className="stroke-purple-300" />
        </svg>
      );
    case 'Activity':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="8" className="stroke-slate-700 fill-slate-900/40" strokeWidth="2" />
          <circle cx="12" cy="12" r="5" className="stroke-emerald-400 fill-slate-950" />
          <circle cx="12" cy="12" r="2" className="stroke-teal-300 fill-emerald-450" />
        </svg>
      );
    case 'ArrowUpCircle':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2" className="stroke-purple-400 fill-purple-950/30" />
          <path d="M12 2v9M8 6h8" className="stroke-purple-300" strokeWidth="2" />
          <path d="M5 11V7h14v4" className="stroke-purple-500" />
        </svg>
      );
    case 'CornerDownRight':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" className="stroke-indigo-400 fill-indigo-950/40" />
          <circle cx="12" cy="12" r="3" className="stroke-indigo-300" />
          <line x1="12" y1="3" x2="12" y2="21" className="stroke-indigo-400/55" />
          <line x1="3" y1="12" x2="21" y2="12" className="stroke-indigo-400/55" />
        </svg>
      );
    case 'Crown':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" className="stroke-yellow-400 fill-yellow-500/10" />
          <rect x="5" y="18" width="14" height="3" rx="1" className="stroke-yellow-500 fill-yellow-900/30" />
          <circle cx="12" cy="11" r="1" className="fill-yellow-300" />
        </svg>
      );
    case 'Eye':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" className="stroke-teal-400 fill-teal-950/20" />
          <circle cx="12" cy="12" r="3" className="stroke-teal-300 fill-teal-500/30" />
          <circle cx="12" cy="12" r="1" className="fill-white" />
        </svg>
      );
    case 'Sparkles':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 22V2h12l3 5-3 5H4" className="stroke-yellow-500 fill-yellow-950/20" strokeWidth="2" />
          <circle cx="9" cy="7" r="2" className="stroke-yellow-300 fill-yellow-405" />
        </svg>
      );
    case 'ShieldAlert':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12,2 22,21 2,21" className="stroke-rose-400 fill-rose-950/30" strokeWidth="2" />
          <line x1="12" y1="9" x2="12" y2="14" className="stroke-rose-300" strokeWidth="2" />
          <circle cx="12" cy="18" r="1.5" className="fill-rose-300" />
        </svg>
      );
    case 'Zap':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" className="stroke-amber-400 fill-amber-500/20" />
        </svg>
      );
    case 'ShieldCheck':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" className="stroke-emerald-400 fill-emerald-950/20" />
          <path d="m9 11 2 2 4-4" className="stroke-emerald-300" strokeWidth="2" />
        </svg>
      );
    case 'Wand2':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="2" x2="22" y2="6" className="stroke-yellow-400" strokeWidth="2" />
          <line x1="3" y1="21" x2="16" y2="8" className="stroke-amber-400" strokeWidth="2.5" />
          <circle cx="20" cy="4" r="3" className="stroke-yellow-300 fill-yellow-400" />
        </svg>
      );
    case 'CupSoda':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 2H7v7c0 4 3 6 4 9v4H8v1h8v-1h-3v-4c1-3 4-5 4-9V2z" className="stroke-purple-400 fill-purple-950/20" />
          <circle cx="12" cy="6" r="2" className="stroke-purple-300 fill-purple-400" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3 7h7l-5.5 4.5 2 7L12 17l-6.5 3.5 2-7L2 9h7z" className="stroke-amber-400 fill-amber-500/15" />
        </svg>
      );
  }
};