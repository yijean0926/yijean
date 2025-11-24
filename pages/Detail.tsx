import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { checkGlyphSupport } from '../components/AnimatedText';

const Detail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredChar, setHoveredChar] = useState('A');
  const [supportedChars, setSupportedChars] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Retrieve font data from navigation state, default to Scope if missing
  const state = location.state as { family: string; name: string } | null;
  const targetFont = state?.family || 'hyeseong-Regular';
  const fontName = state?.name || 'SCOPE MEDIUM';

  // Specific character set for A_Pretzel-Regular (Fictional)
  const pretzelCharString = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz가각간갈감갔강갖같개갯거건걸겁것겉게겠겨격겪견결겼경계고골곳공과관괴교구국군굴굵굽궁귀귤그극근글금급기긴길김깁깃까깎깔깡깨꼬꼭꾸꾼꿈꿔뀌끄끗끝끼낀낌나난날낡남났낭낮낯낱내낸낼냄냅냇냈너넌널넓넘넛넣네녀년녕노녹논놀놓놨누눈눌느는늘니닌님닙다닦단달닭담답닷당닿대댁더던덟덧덩덮데도독돈돋돌동돼되된될됩두둑둔둘둥뒤뒷드득든들듭듯등디따땀땅때떤떨떴떻또똑뚝뛰뜨뜻라란랄람랑래램량러럭런럼럽럿렀렇레렛려력련렴렸례로록롭롱료루류르른를름리릭린림릿마막만많말맑맘맙맛망맞매맹맺머먹먼멋멍멧며면명몇모목몬몸못몽묘무묶문묻물뭐뭔믱미민믿밀바박밖반받발밝밤밥방배뱀버번벌법벙베벽변별병보복본볼봄봅봉부북분불붕붙븐비빈빛빠빨빵뿌뿐쁘쁜쁨사산살상새색생서석섞선설섬섰성세셔셜셨소속솎손솔송수숙순술숨숲쉬쉴쉽스슨슬슴습슷승시식신실싫심십싱싶싸싹쌉써쎄쏀쓰쓴씀씜씨씩씫씬아안앉않알았앞애액야약얀얄얇양어억언얻얼엄업없엇었엉에엣여연열엽였영예옛오옥온올옴와완왜외요욕용우욱운울움웃워원월위유으은을음읍의읜읨이익인일읽임입있잊자작잔잖잘잠잡장재쟁저적전절점접정제져조족존좀종좋죄죠주죽준줄줌중즈즐지직진짐집짓짜짝째쪽쮓쯍쯔찍찡차착찬참창찾채책처천철첫체첼쳐초촌추춤충춰치친침카칸커컴케켜코콤콩크큰큼큽키킬킹타탕태터턴테토통투트특틈팅파판팬퍼퍽페편포폴퐁표푸퓔퓜프플피필핑하학한할함합해햇향허헤혀현호혼화확활황획효후훈훌휴흐흔흩흰히힌0123456789.,:;!?*#/\-_(){}[]“”‘’«»"'@&$₩+=~^%`;

  // Specific character set for A_Jajaknamu-Regular (Indicate Mono)
  const jajaknamuCharString = `가각간갇갈갉갊갋감갑값갓갔강갖갗같갚갛개객갠갣갤갬갭갯갰갱갸갹갼걀걋걍걔걘걜걥거걱건걷걸걺검겁겂것겄겅겆겉겊겋게겍겐겔겜겝겟겠겡겨격겪견겯결겷겸겹겻겼경겿곁계곈곌곕곗곘고곡곤곧골곪곬곯곰곱곳공곶곹과곽관괄괆괌괍괏괐광괒괘괜괠괢괩괬괭괴괵괸괼굄굅굇굉교굔굘굠굡굣굥구국군굳굴굵굶굻굼굽굿궁궂궃궈궉권궐궜궝궤궷궸귀귁귄귈귐귑귓귕규균귤귬귭그극근귿글긁긂긇금급긋긍긏긑긓긔긘긩기긱긴긷길긺김깁깃깄깅깆깊까깍깎깐깔깖깜깝깟깠깡깥깨깩깬깯깰깸깹깻깼깽꺄꺅꺆꺌꺍꺠꺤꺼꺽꺾껀껄껌껍껏껐껑껓껕께껙껜껨껫껭껴껸껼꼇꼈꼉꼍꼐꼬꼭꼰꼲꼳꼴꼼꼽꼿꽁꽂꽃꽅꽈꽉꽌꽐꽜꽝꽤꽥꽨꽸꽹꾀꾄꾈꾐꾑꾕꾜꾸꾹꾼꿀꿇꿈꿉꿋꿍꿎꿏꿔꿘꿜꿨꿩꿰꿱꿴꿸뀀뀁뀄뀌뀐뀔뀜뀝뀨뀰뀼끄끅끈끊끌끎끓끔끕끗끙끝끠끤끼끽낀낄낌낍낏낐낑나낙낚난낟날낡낢남납낫났낭낮낯낱낳내낵낸낻낼냄냅냇냈냉냐냑냔냗냘냠냡냣냥냬너넉넋넌넏널넑넒넓넘넙넛넜넝넢넣네넥넨넫넬넴넵넷넸넹넾녀녁년녇녈념녑녔녕녘녜녠녱노녹논놀놁놂놈놉놋농놑높놓놔놘놜놥놨놰뇄뇌뇍뇐뇔뇜뇝뇟뇡뇨뇩뇬뇰뇸뇹뇻뇽누눅눈눋눌눍눔눕눗눙눝눠눴눼뉘뉜뉠뉨뉩뉴뉵뉻뉼늄늅늉느늑는늗늘늙늚늠늡늣능늦늧늪늫늬늰늴늼늿닁니닉닌닏닐닒님닙닛닝닞닠닢다닥닦단닫달닭닮닯닳담답닷닸당닺닻닽닿대댁댄댈댐댑댓댔댕댖댜댠댱더덕덖던덛덜덞덟덤덥덧덩덫덮덯데덱덴델뎀뎁뎃뎄뎅뎌뎐뎔뎠뎡뎨뎬도독돈돋돌돎돐돔돕돗동돛돝돠돤돨돼됏됐되된될됨됩됫됬됭됴두둑둔둗둘둚둠둡둣둥둬뒀뒈뒙뒝뒤뒨뒬뒵뒷뒸뒹듀듄듈듐듕드득든듣들듥듦듧듬듭듯등듸듼딀디딕딘딛딜딤딥딧딨딩딪딫딮따딱딲딴딷딸땀땁땃땄땅땋때땍땐땔땜땝땟땠땡떄떈떔떙떠떡떤떨떪떫떰떱떳떴떵떻떼떽뗀뗄뗌뗍뗏뗐뗑뗘뗬또똑똔똘똠똡똣똥똬똭똰똴뙇뙈뙜뙤뙨뚜뚝뚠뚤뚧뚫뚬뚯뚱뚸뛔뛰뛴뛸뜀뜁뜄뜅뜌뜨뜩뜬뜯뜰뜳뜸뜹뜻뜽뜾띃띄띈띌띔띕띠띡띤띨띰띱띳띵라락란랃랄람랍랏랐랑랒랖랗래랙랜랟랠램랩랫랬랭랰랲랴략랸럅럇량럐럔러럭런럳럴럼럽럿렀렁렇레렉렌렐렘렙렛렜렝려력련렫렬렴렵렷렸령례롄롑롓로록론롣롤롬롭롯롱롸롹롼뢍뢔뢨뢰뢴뢸룀룁룃룅료룐룔룝룟룡루룩룬룰룸룹룻룽뤄뤈뤘뤠뤤뤼뤽륀륄륌륏륑류륙륜률륨륩륫륭르륵른를름릅릇릉릊릍릎릏릐릔리릭린릴림립릿맀링맆마막만많맏말맑맒맘맙맛맜망맞맟맡맢맣매맥맨맫맬맴맵맷맸맹맺맻맽먀먁먄먈먐먕머먹먼멀멂멈멉멋멌멍멎멓메멕멘멛멜멤멥멧멨멩멫며멱면멷멸몃몄명몇몌몐모목몬몯몰몱몲몸몹못몽뫄뫈뫘뫙뫠뫴뫼묀묄묌묍묏묑묘묜묠묩묫무묵문묻물묽묾뭄뭅뭇뭉뭍뭐뭔뭘뭡뭣뭤뭥뭬뮈뮌뮐뮙뮛뮤뮨뮬뮴뮷뮹므믁믄믈믐믑믓믕믜믠믭믱미믹민믿밀밂밈밉밋밌밍및밑바박밖반받발밝밞밟밣밤밥밧밨방밫밭배백밴밷밸뱀뱁뱃뱄뱅뱉뱌뱍뱐뱜뱝뱟뱡버벅번벋벌범법벗벘벙벚벝벟베벡벤벧벨벰벱벳벴벵벼벽변별볌볍볏볐병볓볕볘볜보복본볻볼볽볾봄봅봇봉봐봔봣봤봥봬뵀뵈뵉뵌뵐뵘뵙뵜뵤뵨뵴부북분붇불붉붊붐붑붓붔붕붙붚붜붝붠붤붭붰붸뷔뷕뷘뷜뷥뷩뷰뷴뷸븀븁븃븅브븍븐블븜븝븟븡븨븩븰븽비빅빈빋빌빔빕빗빘빙빚빛빠빡빤빧빨빩빪빰빱빳빴빵빻빼빽뺀뺄뺌뺍뺏뺐뺑뺘뺙뺜뺨뻐뻑뻔뻗뻘뻙뻠뻣뻤뻥뻬뻰뼁뼈뼉뼌뼘뼙뼛뼜뼝뽀뽁뽄뽈뽐뽑뽓뽕뾔뾰뾱뿅뿌뿍뿐뿔뿕뿜뿝뿟뿡쀠쀼쁑쁘쁜쁠쁨쁩쁭삐삑삔삘삠삡삣삥사삭삯산삳살삵삶삼삽삿샀상샅샆새색샌샏샐샘샙샛샜생샤샥샨샬샴샵샷샹샾섀섁섄섈섐섕서석섞섟선섣설섦섧섬섭섯섰성섶세섹센섿셀셈셉셋셌셍셑셔셕션셜셤셥셧셨셩셰셱셴셸솀솁솅소속손솓솔솖솜솝솟송솥솨솩솬솰솽쇄쇈쇌쇔쇗쇘쇠쇤쇨쇰쇱쇳쇴쇵쇼쇽숀숄숌숍숏숑숖수숙순숟술숨숩숫숭숯숱숲숴쉈쉐쉑쉔쉘쉠쉥쉬쉭쉰쉴쉼쉽쉿슁스습시식신실심싱써쓰쓴쓸아안않알았애야약얀양얗어억언얼엄업없엇었엉에여역연엽였영예오온와왔왕외요용우욱운울웁워원월위유으은을음응의이인일잃임있잉잊자작잔잘잠장재저적전절점정젖제조종좇좋주죽중즈즉증지직진질집짓째쫓차찰찻창찾채책처천첫청체쳐초추췌츠치침카커코크큼타태터텅토통트특파편평포품프피하학한할함합해햇행향험현형호화환활회효후흐히[]`;

  // Specific character set for AtheneBold-Regular (Handwritten)
  const atheneCharString = `가각간것게겨계고공교구국귀그글금기까나남내녀논놓는능니다닭담대더데도독돈되두둘드들디또띄라람럽렇로론르를리림립마만말먼메면모무문묾미민발배백법보본부분비뿌사상서선설성세소속술쉬쉽스시신심싸써쓰쓴아안알야어얼엇에여연예오올와외요우울워원유으은을음의이인있자작잘장재저전절조좋줄즉지째창책처천첫췌친터테통포품하한함핵했헤호화후히[]`;

  // Specific character set for Dolin-Regular (System)
  const dolinCharString = `!"',.:;?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`;

  // Comprehensive character set for other fonts
  const defaultCharString = `ABCDEFGHIJKLMNOPQRSTUVWXYZＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺabcdefghijklmnopqrstuvwxyzａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ가각갂갃간갅갆갇갈갉갊갋갌갍갎갏감갑값갓갔강갖갗갘같갚갛개객갠갣갤갬갭갯갰갱갸갹갼걀걋걍걔걘걜걥거걱건걸걷걸걺검겁겂것겄겅겆겉겊겋게겍겐겔겜겝겟겠겡겨격겪견겯결겷겸겹겻겼경겿곁계곈곌곕곗곘고곡곤곧골곪곬곯곰곱곳공곶곹과곽관괄괆괌괍괏괐광괒괘괜괠괢괩괬괭괴괵괸괼굄굅굇굉교굔굘굠굡굣굥구국군굳굴굵굶굻굼굽굿궁궂궃궈궉권궐궜궝궤궷궸귀귁귄귈귐귑귓귕규균귤귬귭그극근귿글긁긂긇금급긋긍긏긑긓긔긘긩기긱긴긷길긺김깁깃깄깅깆깊까깍깎깏깐깑깒깓깔깕깖깗깘깙깛깜깝깞깟깠깡깢깣깤깥깦깧깨깩깬깯깰깸깹깻깼깽꺄꺅꺆꺈꺌꺍꺠꺤꺼꺽꺾껀껄껌껍껏껐껑껓껕께껙껜껨껫껭껴껸껼꼇꼈꼉꼍꼐꼬꼭꼰꼲꼳꼴꼼꼽꼿꽁꽂꽃꽅꽈꽉꽌꽐꽜꽝꽤꽥꽨꽸꽹꾀꾄꾈꾐꾑꾕꾜꾸꾹꾼꿀꿇꿈꿉꿋꿍꿎꿏꿔꿘꿜꿨꿩꿰꿱꿴꿸뀀뀁뀄뀌뀐뀔뀜뀝뀨뀰뀼끄끅끈끊끌끎끓끔끕끗끙끝끠끤끼끽낀낄낌낍낏낐낑나낙낚낛난낝낞낟날낡낢낣낤낥낦낧남납낪낫났낭낮낯낰낱낲낳내낵낸낻낼냄냅냇냈냉냐냑냔냗냘냠냡냣냥냬너넉넋넌넏널넑넒넓넘넙넛넜넝넢넣네넥넨넫넬넴넵넷넸넹넾녀녁년녇녈념녑녔녕녘녜녠녱노녹논놀놁놂놈놉놋농놑높놓놔놘놜놥놨놰뇄뇌뇍뇐뇔뇜뇝뇟뇡뇨뇩뇬뇰뇸뇹뇻뇽누눅눈눋눌눍눔눕눗눙눝눠눴눼뉘뉜뉠뉨뉩뉴뉵뉻뉼늄늅늉느늑는늗늘늙늚늠늡늣능늦늧늪늫늬늰늴늼늿닁니닉닌닏닐닒님닙닛닝닞닠닢다닥닦닧단닩닪닫달닭닮닯닰닱닲닳담답닶닷닸당닺닻닼닽닾닿대댁댄댇댈댐댑댓댔댕댖댜댠댱더덕덖던덛덜덞덟덤덥덧덩덫덮덯데덱덴델뎀뎁뎃뎄뎅뎌뎐뎔뎠뎡뎨뎬도독돈돋돌돎돐돔돕돗동돛돝돠돤돨돼됏됐되된될됨됩됫됬됭됴두둑둔둗둘둚둠둡둣둥둬뒀뒈뒙뒝뒤뒨뒬뒵뒷뒸뒹듀듄듈듐듕드득든듣들듥듦듧듬듭듯등듸듼딀디딕딘딛딜딤딥딧딨딩딪딫딮따딱딲딳딴딵딶딷딸딹딺딻딼딽딿땀땁땂땃땄땅땆땇땈땉땊땋때땍땐땔땜땝땟땠땡땨땬떄떈떔떙떠떡떤떨떪떫떰떱떳떴떵떻떼떽뗀뗄뗌뗍뗏뗐뗑뗘뗬또똑똔똘똠똡똣똥똬똭똰똴뙇뙈뙜뙤뙨뚜뚝뚠뚤뚧뚫뚬뚭뚯뚱뚸뛔뛰뛴뛸뜀뜁뜄뜅뜌뜨뜩뜬뜯뜰뜳뜸뜹뜻뜽뜾띃띄띈띌띔띕띠띡띤띨띰띱띳띵라락띾띿란랁랂랃랄랅랆랇랈랉랊랋람랍랎랏랐랑랒랓랔랕랖랗래랙랜랟랠램랩랫랬랭랰랲랴략랸랻럅럇량럐럔러럭런럲럳럴럼럽럿렀렁렇레렉렌렐렘렙렛렜렝려력련렫렬렴렵렷렸령례롄롑롓로록론롣롤롬롭롯롱롸롹롼뢍뢔뢨뢰뢴뢸룀룁룃룅료룐룔룝룟룡루룩룬룰룸룹룻룽뤄뤈뤘뤠뤤뤼뤽륀륄륌륏륑류륙륜률륨륩륫륭르륵른를름릅릇릉릊릍릎릏릐릔리릭린릴림립릿맀링맆마막맊맋만맍많맏말맑맒맓맔맕맖맗맘맙맚맛맜망맞맟맠맡맢맣매맥맨맫맬맴맵맷맸맹맺맻맽먀먁먄먈먐먕머먹먼멀멂멈멉멋멌멍멎멓메멕멘멛멜멤멥멧멨멩멫며멱면멷멸몃몄명몇몌몐모목몫몬몯몰몱몲몸몹못몽뫄뫈뫘뫙뫠뫴뫼묀묄묌묍묏묑묘묜묠묩묫무묵묶문묻물묽묾뭄뭅뭇뭉뭍뭏뭐뭔뭘뭡뭣뭤뭥뭬뮈뮊뮌뮐뮙뮛뮤뮨뮬뮴뮷뮹므믁믄믈믐믑믓믕믜믠믭믱미믹민믿밀밂밈밉밋밌밍및밑바박밖밗반밙밚받발밝밞밟밠밡밢밣밤밥밦밧밨방밪밫밬밭밮밯배백밲밴밷밸뱀뱁뱃뱄뱅뱉뱌뱍뱐뱜뱝뱟뱡버벅번벋벌벎범법벗벘벙벚벝벟베벡벤벧벨벰벱벳벴벵벼벽변별볌볍볏볐병볓볕볘볜보복볶본볻볼볽볾볿봄봅봇봉봐봔봣봤봥봬뵀뵈뵉뵌뵐뵘뵙뵜뵤뵨뵴부북분붇불붉붊붐붑붓붔붕붙붚붜붝붠붤붭붰붴붸뷁뷔뷕뷘뷜뷥뷩뷰뷴뷸븀븁븃븅브븍븐블븕븜븝븟븡븨븩븰븽비빅빈빋빌빎빔빕빗빘빙빚빛빠빡빢빣빤빥빦빧빨빩빪빫빬빭빯빰빱빲빳빴빵빶빷빸빹빺빻빼빽빾뺀뺄뺌뺍뺏뺐뺑뺘뺙뺜뺨뻐뻑뻔뻗뻘뻙뻠뻣뻤뻥뻬뻰뼁뼈뼉뼌뼘뼙뼛뼜뼝뽀뽁뽄뽈뽐뽑뽓뽕뾔뾰뾱뿅뿌뿍뿐뿔뿕뿜뿝뿟뿡쀠쀼쁑쁘쁜쁠쁨쁩쁭삐삑삔삘삠삡삣삥사삭삮삯산삱삲삳살삵삶삷삸삹삺삻삼삽삾삿샀상샂샃샄샅샆샇새색샌샏샐샘샙샛샜생샤샥샨샬샴샵샷샹샾섀섁섄섈섐섕서석섞섟선섣설섦섧섬섭섯섰성섶세섹센섿셀셈셉셋셌셍셑셔셕션셜셤셥셧셨셩셰셱셴셸솀솁솅소속솎손솓솔솖솜솝솟송솥솨솩솬솰솽쇄쇈쇌쇔쇗쇘쇠쇤쇨쇰쇱쇳쇴쇵쇼쇽숀숄숌숍숏숑숖수숙순숟술숨숩숫숭숯숱숲숴쉈쉐쉑쉔쉘쉠쉥쉬쉭쉰쉴쉼쉽쉿슁슈슉슌슐슘슛슝스슥슨슫슬슭슲슴습슷승싀싁시식신싣실싥싫심십싯싰싱싳싶싸싹싺싻싼싽싾싿쌀쌁쌂쌃쌄쌅쌇쌈쌉쌊쌋쌌쌍쌎쌏쌐쌑쌒쌓쌔쌕쌖쌘쌜쌤쌥쌧쌨쌩쌰쌱쌴썅썜썡써썩썬썰썲썸썹썼썽쎂쎄쎅쎈쎌쎔쎠쎤쎵쎼쏀쏘쏙쏚쏜쏟쏠쏢쏨쏩쏭쏴쏵쏸쏼쐈쐋쐐쐤쐬쐰쐴쐼쐽쑀쑈쑝쑤쑥쑨쑬쑴쑵쑷쑹쒀쒐쒔쒜쒠쒬쒸쒼쓔쓩쓰쓱쓴쓸쓺쓿씀씁씃씌씐씔씜씨씩씫씬씰씸씹씻씼씽씿아악앆앇안앉않앋알앍앎앏앐앑앒앓암압앖앗았앙앚앛앜앝앞앟애액앤앨앰앱앳앴앵야약얀얄얇얌얍얏얐양얕얗얘얜얠얩얬얭어억언얹얺얻얼얽얾엄업없엇었엉엊엌엎엏에엑엔엘엠엡엣엤엥여역엮연엳열엶엷염엽엾엿였영옅옆옇예옌옏옐옘옙옛옜옝오옥옦온옫올옭옮옯옰옳옴옵옷옹옻와왁완왈왎왐왑왓왔왕왗왘왜왝왠왬왭왯왰왱외왹왼욀욈욉욋욌욍요욕욘욜욤욥욧용우욱운욷울욹욺움웁웂웃웅웇워웍원월웜웝웟웠웡웨웩웬웰웸웹웻웽위윅윈윌윔윕윗윘윙유육윤율윰윱윳융윷으윽윾은읃을읇읊음읍읎읏응읒읓읔읕읖읗의읜읠읨읩읫읬읭이익인읻일읽읾잃임입잇있잉잊잌잍잎자작잒잓잔잕잖잗잘잙잚잛잜잝잞잟잠잡잢잣잤장잦잧잨잩잪잫재잭잰잴잼잽잿쟀쟁쟈쟉쟌쟎쟐쟘쟝쟤쟨쟬쟵저적젂전젇절젉젊젋점접젓젔정젖제젝젠젤젬젭젯젱져젹젼졀졂졈졉졋졌졍졔조족존졸졺좀좁좃종좆좇좋좌좍좐좔좝좟좡좦좨좬좼좽죄죅죈죌죔죕죗죙죠죡죤죵주죽준줄줅줆줌줍줏중줘줬줴쥐쥑쥔쥘쥠쥡쥣쥬쥭쥰쥴쥼즁즈즉즌즐즒즘즙즛증즤지직진짇질짊짐집짓짔징짖짗짙짚짜짝짞짟짠짡짢짣짤짥짦짧짨짩짫짬짭짮짯짰짱짲짳짴짵짶짷째짹짼쨀쨈쨉쨋쨌쨍쨔쨘쨤쨩쨰쩌쩍쩐쩔쩜쩝쩟쩠쩡쩨쩰쩽쪄쪘쪼쪽쫀쫃쫄쫌쫍쫏쫑쫒쫓쫘쫙쫜쫠쫬쫴쬈쬐쬔쬘쬠쬡쬧쬬쬭쬲쭁쭈쭉쭌쭐쭘쭙쭛쭝쭤쭸쭹쮀쮓쮜쮸쯍쯔쯕쯤쯧쯩찌찍찐찓찔찜찝찟찡찢찦찧차착찪찫찬찭찮찯찰찱찲찳찴찵찶찷참찹찺찻찼창찾찿챀챁챂챃채책챈챌챔챕챗챘챙챠챤챦챨챰챵처척천철첨첩첫첬청체첵첸첼쳄쳅쳇쳉쳊쳐쳔쳡쳤쳥쳬쳰촁초촉촌촐촘촙촛총촣촤촥촨촬촵촹쵀최쵠쵤쵬쵭쵯쵱쵸춈추축춘출춤춥춧충춰췄췌췍췐췔취췬췰췸췹췻췽츄츅츈츌츔츙츠측츤츨츩츰츱츳층츼치칙친칟칠칡칢침칩칫칬칭칮칰카칵칶칷칸칹칺칻칼칽칾칿캀캁캂캃캄캅캆캇캈캉캊캋캌캍캎캏캐캑캔캘캠캡캣캤캥캨캬캭캰컁컄커컥컨컫컬컴컵컷컸컹컽케켁켄켈켐켑켓켔켕켘켙켜켠켤켬켭켯켰켱켸코콕콘콛콜콤콥콧콩콰콱콴콸쾀쾃쾅쾌쾡쾨쾰쿄쿈쿠쿡쿤쿨쿰쿱쿳쿵쿼쿽퀀퀄퀌퀑퀘퀜퀠퀭퀴퀵퀸퀼큄큅큇큉큐큔큘큠크큭큰큲클큼큽킁킄킈키킥킨킬킴킵킷킸킹타탁탂탃탄탅탆탇탈탉탊탋탌탍탎탏탐탑탒탓탔탕탖탗탘탙탚탛태택탠탤탬탭탯탰탱탸탼턍턔터턱턴털턺턻텀텁텃텄텅테텍텐텔템텝텟텡텦텨텬텰텻텼톄톈토톡톤톧톨톰톱톳통톺톼퇀퇘퇴퇸퇻툇툉툐툥투툭툰툴툶툼툽툿퉁퉈퉜퉤퉷튀튁튄튈튐튑튕튜튠튤튬튱트특튼튿틀틂틈틉틋틍틑틔틘틜틤틥티틱틴틸팀팁팃팅파팍팎팏판팑팒팓팔팕팖팗팘팙팚팛팜팝팞팟팠팡팢팣팤팥팦팧패팩팬팯팰팸팹팻팼팽퍄퍅퍈퍝퍞퍼퍽펀펄펌펍펏펐펑펖페펙펜펠펨펩펫펭펴펵편펼폄폅폈평폐폔폘폡폣포폭폰폴폼폽폿퐁퐅퐈퐉퐝푀푄표푠푤푭푯푸푹푼푿풀풂품풉풋풍풔풩퓌퓐퓔퓜퓟퓨퓬퓰퓸퓻퓽프픈플픔픕픗픙픠픵피픽핀필핌핍핏핐핑하학핚핛한핝핞핟할핡핢핣핤핥핧함합핪핫핬항핮핯핰핱핲핳해핵핸핻핼햄햅햇했행햋햏햐햔햣향햬헀허헉헌헐헒헓헗험헙헛헝헠헡헢헣헤헥헨헬헴헵헷헸헹헿혀혁현혈혐협혓혔형혜혠혤혭호혹혼홀홅홈홉홋홍홑화확환활홥홧홨황홰홱홴횃횅회획횐횔횝횟횡효횬횰횹횻횽후훅훈훌훍훐훑훓훔훕훗훙훠훤훨훰훵훼훽휀휄휑휘휙휜휠휨휩휨휩휫휭휴휵휸휼흄흇흉흐흑흔흖흗흘흙흝흠흡흣흥흩희흰흴흼흽힁히힉힌힐힘힙힛힜힝힣ㄱㄲㄳㄴㄵㄶㄷㄸㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅃㅄㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹ０１２３４５６７８９0123456789❶❷❸❹❺❻❼❽❾❿⓫⓬⓭⓮⓯①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽⑾⑿⒀⒁⒂/.notdef .,:;…!?·•*#‾※/\‥＆＊＠＼：，！＃％．？＂＇；／＿-­–—‒―_〜－(){}[]〈〉【】｛｝「」《》『』［］（）“”‘’‹›‵"'㎐㏂㏃㎤㎠㏇㏆㏈㎗㎓㎬㎄㎑㎘㎦㎢㏀㎪㎒㎣㎟㏁㎧㎨㎫㎡㎂㎌㎍㎕㎛㎲㎶㎯㎔㈉㈗㈈㈖㈜㈍㈛㈇㈕㈊㈘㈀㈎㈄㈒㈁㈏㈌㈚㈅㈓㈃㈑㈆㈔㉿㈋㈙㈂㈐㉩㉷㉨㉶㉭㉻㉧㉾㉵㉪㉸㉠㉮㉤㉲㉡㉯㉬㉺㉥㉳㉣㉱㉦㉴㉫㉹㉢㉰｀￣@&§©®™|ℓ№℡¢¤$€£₩¥＄￦∕+=><~^Ω%～｜＝＞＜＋¨`
  
  // Select the appropriate character string
  let charString = defaultCharString;
  if (targetFont === 'A_Pretzel-Regular') {
    charString = pretzelCharString;
  } else if (targetFont === 'A_Jajaknamu-Regular') {
    charString = jajaknamuCharString;
  } else if (targetFont === 'AtheneBold-Regular') {
    charString = atheneCharString;
  } else if (targetFont === 'Dolin-Regular') {
    charString = dolinCharString;
  }

  // Convert massive string to array and filter for validity
  const characters = Array.from(charString);

  useEffect(() => {
    const filterCharacters = () => {
      // Filter out characters that are not supported OR are just whitespace/newlines
      const filtered = characters.filter(char => 
        char.trim() !== '' && checkGlyphSupport(char, targetFont)
      );
      // Remove duplicates just in case
      const uniqueFiltered = Array.from(new Set(filtered));
      setSupportedChars(uniqueFiltered);
      setIsLoaded(true);
    };

    if (document.fonts.status === 'loaded') {
      filterCharacters();
    } else {
      document.fonts.ready.then(filterCharacters);
    }
  }, [targetFont, charString]);

  return (
    <div className="min-h-screen w-full bg-[#F5F5F0] text-[#111] relative overflow-x-hidden font-['Space_Mono'] selection:bg-red-200 selection:text-red-900">
      
      {/* Fixed Large Preview (Bottom Left) */}
      <div className="fixed bottom-[10vh] left-[5vw] pointer-events-none z-0 select-none hidden md:block">
        <motion.span 
          key={hoveredChar}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-[12rem] lg:text-[17rem] leading-none text-black tracking-tighter"
          style={{ fontFamily: targetFont }}
        >
          {hoveredChar}
        </motion.span>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full min-h-screen flex flex-col p-6 md:p-12">
        
        {/* Navigation / Header */}
        <div className="w-full flex justify-end md:justify-end mb-12 md:mb-24">
             <button 
              onClick={() => navigate('/')}
              className="text-xs md:text-sm font-['Space_Mono'] uppercase tracking-widest hover:text-red-600 transition-colors"
            >
              Close ✕
            </button>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col md:flex-row w-full">
          
          {/* Left Spacer (Occupied by fixed letter on Desktop) */}
          <div className="hidden md:block w-1/5 lg:w-1/4"></div>

          {/* Right Grid Area */}
          <div className="w-full md:w-4/5 lg:w-3/4 pl-0 md:pl-[132px] pt-24">
            
            {/* Section Header */}
            <div className="border-b border-black mb-8 pb-2 flex justify-between items-baseline">
              <h2 className="text-sm md:text-base tracking-widest uppercase font-['Space_Mono']">
                Character Set of {fontName}
              </h2>
              <span className="text-xl">↓</span>
            </div>

            {/* Character Grid */}
            <div 
              className="grid grid-cols-8 md:grid-cols-[repeat(15,minmax(0,1fr))] gap-y-2 md:gap-y-3 text-2xl md:text-4xl leading-none min-h-[50vh] text-center w-full place-items-center"
              style={{ fontFamily: targetFont }}
            >
              {isLoaded && supportedChars.map((char, index) => (
                <span 
                  key={`${index}-${char}`}
                  onMouseEnter={() => setHoveredChar(char)}
                  className={`
                    cursor-crosshair transition-colors duration-200 select-none flex justify-center items-center h-12 w-full
                    ${hoveredChar === char ? 'text-[#FF0000]' : 'text-black hover:text-[#FF0000]'}
                  `}
                >
                  {char}
                </span>
              ))}
            </div>

             {/* Footer Info */}
             <div className="mt-24 pt-8 border-t border-gray-300 grid grid-cols-2 gap-8 font-['Space_Mono'] text-xs uppercase tracking-widest opacity-60">
                <div>
                   <p className="mb-1 text-black">Format</p>
                   <p>OpenType (OTF)</p>
                </div>
                <div>
                   <p className="mb-1 text-black">Glyph Count</p>
                   <p>{supportedChars.length} Characters</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;