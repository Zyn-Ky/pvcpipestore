import UserVerifyID from "@/libs/api/VerifyID";
import AdminFirebaseApp from "@/libs/firebase/adminConfig";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (!AdminFirebaseApp)
    return NextResponse.json(
      {
        code: 500,
        message: "SERVER_BUSY",
      },
      { status: 500 }
    );

  const Token = req.headers.get("Authorization")?.split(" ")[1];
  if (Token === undefined)
    return NextResponse.json(
      {
        code: 400,
        message: "INVALID_CREDENTIAL",
      },
      {
        status: 400,
      }
    );
  console.log(Token);
  // const { IsValid, UserExists } = await UserVerifyID(AdminFirebaseApp, Token);
  if (true)
    return NextResponse.json({
      code: 401,
      message: "INVALID_CREDENTIAL",
    });

  return NextResponse.json({
    code: 200,
    message: "",
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium obcaecati doloremque optio fugiat aliquam, aspernatur molestias eaque id repellat eligendi voluptatum iste quaerat est nobis amet itaque ratione quidem aperiam!
  Necessitatibus nulla neque ad, mollitia voluptatum rem atque nam nostrum, dolorum fugit pariatur accusamus. Consequuntur vitae aspernatur veniam aliquam necessitatibus beatae optio, libero voluptatum temporibus voluptatibus, dolorum, neque placeat quaerat.
  Nam voluptatem quidem minima vel dolores tempora unde. Repudiandae, rerum magni facilis voluptas repellat non nostrum pariatur placeat, quaerat omnis autem consequuntur? Beatae deserunt laborum veniam nobis nam minus modi.
  Fugiat eligendi beatae dolor tempora iure optio dolores sequi laborum. Quibusdam eius assumenda, eveniet ex nemo minima nobis amet, ea excepturi sed vero eligendi natus cum nam facilis corrupti omnis?
  Accusantium, debitis inventore dolorum, recusandae odit quaerat, alias ad possimus ducimus cum totam qui tenetur voluptatem adipisci saepe. Dolorem explicabo dolorum ipsam consequatur, dolore similique temporibus fugit quidem in neque?
  Culpa facilis explicabo delectus nisi accusantium quam, et eligendi vero necessitatibus. Perspiciatis in esse cum aut fuga porro officia omnis accusantium qui tempora consequuntur cupiditate, sint, quaerat quis voluptate nobis!
  Laudantium, velit quaerat! Magnam mollitia est eius unde eos aut libero natus tenetur dicta et placeat sit tempora adipisci deleniti vero, officiis nulla laborum totam aliquam obcaecati quo quas? Quibusdam!
  Eius eligendi cumque, temporibus laborum ut dolore beatae atque illum corrupti placeat voluptatum? Tenetur quae rem nulla est deserunt blanditiis sit expedita id libero ut! Beatae ex provident omnis modi.
  Quia vel reiciendis assumenda adipisci ullam eligendi sit culpa rerum nostrum temporibus at amet illo deleniti, ducimus iusto beatae perferendis facere quisquam. Doloribus neque quis rem? Architecto molestias illo provident.
  Eveniet suscipit laborum recusandae facere, autem temporibus odit ad nemo incidunt, assumenda eos? Aliquid maiores vel omnis non porro et veniam asperiores, aspernatur reprehenderit molestiae adipisci vitae impedit itaque officiis!
  At mollitia eveniet alias excepturi sequi soluta molestiae quae magnam libero quaerat voluptatibus necessitatibus, laborum dolorum sint, quo minima, atque commodi cumque quas quis impedit accusantium nisi ipsa odio? Id?
  Debitis dignissimos ratione odio eius perspiciatis saepe sed, error, facere molestias sapiente dolor! Eum animi vitae reiciendis dicta, nesciunt tempore earum officia perspiciatis exercitationem. Beatae necessitatibus facere sunt voluptates officiis.
  Commodi cumque quia beatae ipsa explicabo doloribus corrupti provident corporis suscipit ut fugit deserunt earum iusto, eligendi error inventore fugiat ratione consequuntur repudiandae excepturi culpa libero nesciunt qui. Sapiente, beatae!
  Suscipit a sunt repellendus ea eos praesentium temporibus tempora ex, placeat neque minus dolores quasi, ullam rem vel ut quos, accusantium magnam nam voluptas excepturi. Iusto sit voluptatem necessitatibus quidem.
  Suscipit ea inventore dolores in ex recusandae? Distinctio doloremque fugiat quo perferendis tempora libero quibusdam, aliquid delectus soluta nesciunt, neque iste voluptas velit, vitae quisquam possimus recusandae. Reiciendis, quidem culpa.
  Saepe sapiente voluptatum, suscipit quod debitis in quia, aut harum expedita doloremque modi magnam minima aperiam nam vitae voluptatibus id! Expedita repellat maxime enim magni obcaecati repudiandae optio, distinctio ducimus!
  Quidem odit possimus voluptatum architecto consequuntur eos porro explicabo, obcaecati accusantium dolores error sed ipsum magni temporibus. Illum in aperiam, ullam ad, doloremque, possimus itaque quisquam quidem sit provident blanditiis!
  Voluptates consequatur possimus libero. Omnis nesciunt similique sunt? Voluptatem voluptate quis quos iste et minima. Harum magni labore iure obcaecati commodi voluptate culpa possimus! Voluptatibus ex ipsum quas quae eius.
  Nam doloribus facere eos quam inventore veniam, quasi unde, recusandae maxime voluptatum rerum. Soluta fugit eum possimus modi corrupti voluptatum ducimus ipsa quam. Deserunt unde doloribus dolor ab nobis hic?
  Dolorem quo ipsam fuga voluptas quidem suscipit! Adipisci ea modi natus consectetur sed. Laborum, et officia vero saepe, ut iusto ea eveniet odit praesentium distinctio possimus, vitae neque blanditiis similique.
  Molestias facilis vel eos minima architecto iste neque perferendis repellendus ducimus rem, fuga odit omnis minus commodi exercitationem voluptatibus distinctio, voluptate facere soluta quia est sed amet, nobis nisi? Quidem?
  Consectetur illo amet in eum officiis cumque laudantium velit rerum asperiores, assumenda facere voluptates? Veniam illum voluptatem dolore, ratione a illo harum est non, animi obcaecati sed. Quae, asperiores recusandae.
  Reiciendis modi repellat voluptas illum officiis fugit corrupti pariatur, numquam vitae incidunt fugiat cum. Sequi facere neque veniam officiis facilis, tenetur nemo. Cumque sed temporibus perspiciatis recusandae quae asperiores illo.
  Corporis ab repellat quam consequatur ullam culpa eius reiciendis, explicabo, non omnis hic iste blanditiis dolor quidem nisi ex magni, voluptatem facilis qui ipsam ad corrupti officia. Pariatur, inventore magnam.
  Nihil quia qui voluptate fuga totam assumenda nesciunt cumque? Sunt necessitatibus, similique dignissimos illo corrupti nihil nisi amet maiores, accusantium laboriosam obcaecati est, non at maxime! Beatae culpa nam repudiandae?
  Earum saepe deserunt vel eius officiis pariatur perspiciatis sed fuga commodi quam velit sapiente distinctio tenetur aliquid ex dolorum similique voluptas totam libero, alias fugiat excepturi laudantium aut itaque. Deleniti.
  Cum cupiditate, id fugit iste odit ut pariatur quisquam cumque adipisci ad quia dignissimos quam facere quaerat voluptatem, atque suscipit alias libero et. Architecto mollitia commodi similique odit, nobis aspernatur.
  Odio, animi? Non unde necessitatibus soluta temporibus beatae vero expedita sit nam eius dignissimos repellendus iure incidunt delectus a consectetur voluptatibus facere excepturi perspiciatis, nisi magni aperiam, dolorem omnis quos.
  Nisi architecto itaque animi nam, dolores voluptatibus culpa, doloremque, est provident voluptate accusamus? Harum atque velit, labore ea sint cum voluptates numquam doloremque repellat. Aliquam architecto error dicta dolore soluta!
  Sapiente quos autem facilis eveniet incidunt quas laudantium fugiat. Cum, laborum pariatur. Dolores autem animi voluptate, voluptas voluptatem, quam sapiente facere quos doloribus iure maiores possimus numquam, beatae alias illo!
  Excepturi aspernatur reprehenderit vero autem et ipsum nisi, dicta incidunt impedit perferendis doloremque, velit non atque vitae beatae ducimus eaque magnam libero porro! Perspiciatis a eveniet laborum in blanditiis? Id!
  Soluta dicta quia modi! Exercitationem error, quaerat id dolores deserunt maiores inventore nam, eligendi porro animi ipsam asperiores culpa sint consectetur atque ipsa? Expedita alias reprehenderit unde cumque numquam impedit.
  Modi praesentium obcaecati labore quos distinctio vel molestiae consectetur amet autem accusamus deleniti corporis maiores laboriosam soluta suscipit, totam nulla est cum itaque libero nisi! Voluptas neque omnis nihil hic?
  Vitae itaque magnam, veniam aliquid, perspiciatis incidunt odit sit laudantium doloremque, rem porro nulla quas debitis eligendi nihil quasi facere quos. Quod doloribus sed, deserunt libero obcaecati necessitatibus nobis voluptatum.
  Illum incidunt similique vel. Asperiores placeat odit quod, magni possimus iure et, voluptates molestias iusto dicta earum temporibus. Saepe ullam cupiditate temporibus. Nostrum iure laborum doloremque voluptate rem tenetur architecto?
  Eligendi culpa iure ea aspernatur corporis, molestias hic dicta dolor alias! Dolorum, quisquam eius! Laborum aperiam eius cum unde consectetur voluptatem rerum distinctio repellendus! Doloribus odit iusto est quod natus!
  Deleniti culpa dolore rerum, obcaecati mollitia animi, aperiam laudantium deserunt doloribus voluptas molestiae neque sint dolores, fugit sit veritatis ratione libero nihil corporis ad et quas debitis. Omnis, accusantium dolores?
  Blanditiis ea doloremque est possimus aliquam nam perferendis, unde ab deserunt illo pariatur laudantium molestias vel libero ex animi consequuntur non veniam architecto ratione perspiciatis autem, dignissimos explicabo dolorem. Velit.
  Quidem, fuga, laboriosam nisi voluptatibus maiores possimus optio recusandae quas delectus consequuntur, numquam odio veritatis. Eum, recusandae molestias? Aperiam qui vel molestiae omnis culpa sint harum, doloribus ipsa veritatis nulla.
  Voluptas, nemo. Voluptatum dicta aperiam voluptatem ratione corrupti sunt delectus sequi asperiores fugit mollitia at veritatis placeat adipisci eius harum, ipsa voluptatibus dolore. Blanditiis, sequi mollitia dolorem iure nesciunt vel.
  Ut ipsa atque laboriosam, voluptatibus hic nobis sunt, suscipit quos neque facere odio quasi. Iste, vitae. Quod nihil cumque iste consectetur nam! Eveniet quo reiciendis hic temporibus ab error placeat.
  Alias in vitae incidunt eius repudiandae. Id distinctio voluptates fuga suscipit eum provident dignissimos temporibus modi adipisci similique odio, sequi iure eius vitae doloremque aspernatur tempora! Rem suscipit minima numquam.
  Nemo reiciendis aut sed sunt enim numquam vitae iusto distinctio corporis id ducimus itaque alias, officia explicabo beatae praesentium quas, pariatur a mollitia nostrum nulla nobis tempora qui. Voluptate, necessitatibus.
  Aut aspernatur ipsum consectetur reiciendis eveniet porro officia temporibus maiores architecto dolore neque tenetur ad, veritatis tempora fuga suscipit illo, rem voluptate alias veniam assumenda odit, molestiae maxime ullam. Tempora.
  Placeat autem est fuga ipsa laudantium debitis. Deleniti iure itaque voluptatum rem alias quaerat doloribus deserunt aliquid eius beatae. Sit vitae temporibus facere ipsam distinctio modi perferendis veniam ut quam!
  Fugit aliquid consequuntur iure tempora dolor voluptatum temporibus officiis ea ipsam, modi excepturi fugiat velit ullam earum voluptates animi quos autem suscipit natus voluptatibus eveniet. Rem sint ipsum expedita optio.
  Cum omnis alias eius sunt quaerat ullam dolor illo sit aspernatur quod accusantium, pariatur vel reprehenderit est, vero consequuntur molestias? Voluptates sapiente hic fuga veritatis ex explicabo quidem error nobis?
  Libero soluta quis sed deserunt, labore maiores nesciunt explicabo ducimus quidem accusantium numquam odio cumque a, veritatis vel, mollitia magnam inventore nostrum. Dolores nam beatae dolorem dolore magnam assumenda accusantium.
  Nobis quos voluptatem aspernatur nemo, autem iste earum ipsa consequatur molestiae similique deleniti illo fuga velit libero obcaecati blanditiis? Beatae saepe, perferendis enim perspiciatis eveniet explicabo sit libero minus quia!
  Sit, sapiente eveniet. Soluta eum odio id veritatis earum tenetur distinctio, repudiandae eos ab in. Magnam architecto asperiores eius, nam quos aliquam fuga earum non, voluptatem omnis modi! Dicta, et?
  Perferendis cumque deleniti, rerum corporis in voluptatibus delectus totam vitae ducimus vero aliquid, necessitatibus omnis voluptas laboriosam dolores nesciunt repudiandae nihil neque ex aliquam, nulla autem! Placeat in sequi similique.
  Deleniti voluptatibus autem recusandae quod labore facilis quasi earum necessitatibus, aut explicabo iste ullam adipisci. Eum, eaque magni eligendi, commodi tempore vero doloribus voluptatum asperiores sequi in minima accusantium atque.
  Numquam obcaecati eaque distinctio doloribus quod ipsam pariatur facere harum facilis rerum autem voluptatem, nostrum, eos repellat vero atque fugiat cum ut. Est illo ipsam quaerat esse sapiente, ab dolor.
  Doloremque quaerat nesciunt aperiam repellat in blanditiis quis, accusantium quidem esse iure sint beatae molestias distinctio amet tenetur a officiis harum repudiandae libero aspernatur illo obcaecati! Eaque corrupti asperiores iusto?
  Vero minus nostrum aut enim harum molestiae voluptatum totam, nihil similique possimus vel quidem, exercitationem corporis repellat ratione mollitia. Ducimus reiciendis officiis culpa dolorem nam facilis similique esse, facere beatae?
  Vitae, doloremque incidunt debitis quasi, recusandae, placeat tenetur eum adipisci illum consectetur sunt ipsum esse eos maxime quod enim aspernatur unde. Officia veniam repudiandae voluptatum beatae maxime tempora eos voluptate.
  Ipsum blanditiis quo at voluptatem consequuntur? Dignissimos illum quo iure maiores sed, explicabo praesentium dolor distinctio repudiandae, ex eum consectetur nemo. Nesciunt iusto debitis in nulla similique assumenda? Laborum, in!
  Perferendis laudantium ullam qui tempore exercitationem molestias nisi iste, sed necessitatibus inventore enim hic rem aspernatur cupiditate beatae at ea neque harum maxime voluptatem autem, quibusdam asperiores ex? Culpa, amet.
  Corrupti rem sit repellat doloremque, reiciendis error tenetur quaerat mollitia, vero praesentium molestiae soluta dolores, eius maiores sequi iste nisi esse blanditiis aliquid cupiditate inventore. Voluptate dolore tenetur modi sapiente?
  Maxime explicabo quis magni iste voluptates consequatur omnis eligendi optio quasi mollitia perspiciatis vero eaque deleniti, facere voluptatibus eum dicta reiciendis nemo totam impedit cum. Ut quos cumque perferendis dolore.
  Consequatur, quas ab quis nam ut, quaerat dolorum cumque consequuntur provident eos, nostrum corrupti cupiditate aliquid odio voluptas quo quia accusamus deleniti veniam rem! Maxime dolorum veniam laborum animi ipsam.
  Quam, architecto. Totam commodi nihil nisi doloremque. In tenetur possimus alias tempora optio quisquam. Deserunt unde consectetur asperiores omnis odio. Labore voluptates fugit ducimus ratione doloribus autem sequi eveniet debitis.
  Non repellendus quis aliquid esse hic nam quas quos amet temporibus labore, a molestias obcaecati? Ut culpa dolorem doloremque voluptatem officia, dignissimos sint porro, repellat suscipit iusto praesentium autem dolorum?
  Enim earum unde soluta similique dolorem iste architecto ab cumque quidem nisi. Quidem incidunt dignissimos suscipit adipisci, quo mollitia itaque provident magni reprehenderit sed delectus expedita neque quae harum temporibus!
  Optio mollitia excepturi sed, minima soluta vitae officia maiores harum in ratione inventore accusamus vero eligendi. Nam, cupiditate sapiente tenetur porro iusto, aperiam placeat nobis tempore ab consectetur beatae autem!
  Veniam eveniet impedit, nesciunt autem ad, laboriosam totam dignissimos numquam quos nostrum debitis illo voluptatem error, neque sit adipisci. Ab maiores nostrum, aliquid mollitia omnis sunt alias distinctio perferendis provident.
  Aspernatur fugiat dicta non, quia odit voluptas libero voluptate, perspiciatis vitae incidunt maxime consequuntur error eaque saepe distinctio facere fuga. Nihil, tenetur. Consequuntur magnam pariatur sed velit atque provident voluptatibus?
  Nulla rerum quisquam debitis ipsam, commodi officiis blanditiis, soluta eos accusamus perferendis voluptatem ex nihil? Neque mollitia atque dolorum iusto nobis dolores qui nemo alias quod, quaerat error exercitationem magnam.
  Qui corporis officiis non odio quos amet consequuntur. Adipisci minus culpa repellendus excepturi laudantium? Tempora praesentium recusandae voluptatem reprehenderit quod doloremque! Itaque ullam laudantium similique sed consequuntur beatae ipsam deleniti.
  Voluptates omnis quae perspiciatis porro possimus repellat suscipit velit corrupti labore eius nobis similique accusamus deleniti maxime impedit ullam debitis nisi natus illo, maiores dolores, beatae voluptatum ex quis? Aliquam.
  Ab autem aperiam provident id ullam, saepe modi iste ad fugit vero assumenda cum recusandae dolor consequatur incidunt eveniet vitae quidem nesciunt ipsa animi labore quo est! Amet, distinctio aliquam!
  Laborum veritatis rerum ut? Nisi harum, sed dolorem consequuntur voluptatem magni, tempore aliquid voluptatibus delectus atque et enim suscipit, laudantium aliquam assumenda maxime culpa sunt minus possimus velit? Labore, nisi.
  At cumque repellat molestias dolores quam perspiciatis quisquam voluptatem consequatur ipsa. Excepturi ullam dignissimos porro quo, amet fugit. Deserunt officia impedit temporibus nesciunt qui modi ullam excepturi exercitationem ex magnam!
  Sunt consectetur fuga soluta enim fugiat porro sapiente facere! Perferendis sed ut soluta adipisci vero, neque voluptatibus harum quia. Reprehenderit ad obcaecati eaque soluta commodi quidem, et fugiat sunt id!
  Totam vero eum obcaecati dolorem, quasi perferendis pariatur voluptatum quas dolores adipisci dolor sed laborum repellendus enim itaque libero quo! Illo, ad eius! Blanditiis nulla, autem totam corrupti deleniti non.
  Accusantium harum adipisci aut ab distinctio dicta, voluptatem repudiandae similique quasi porro aliquam sint natus aperiam amet reprehenderit quia illo, fugiat ex cumque nam iusto rerum quis eaque? Soluta, dignissimos!
  Officiis neque atque veritatis optio beatae, magni possimus fugiat explicabo amet reiciendis aliquam vero accusamus quidem? Odit, totam commodi? Sunt illum inventore commodi quos sint architecto labore porro ea tempore.
  Minus dolorum voluptates veniam quas maiores quae consequuntur perferendis! Sed mollitia dicta fuga impedit quis obcaecati ab quae non ipsum, voluptas asperiores, repellat odio aut iste nobis nisi a ratione?
  Adipisci expedita perspiciatis natus. Dolores dicta asperiores esse minus illo iure est ipsa modi accusamus! Ipsa, enim pariatur eos iste deserunt modi vel quo amet nesciunt hic inventore fugit temporibus.
  In nobis ipsam voluptas voluptatum, et reiciendis quo deleniti nisi dignissimos sapiente quas provident eligendi perferendis consectetur! Obcaecati placeat minima beatae laudantium sunt, dolorem rem temporibus. Unde autem quis eaque.
  Totam at, laboriosam non voluptates corporis tenetur autem. Corporis quod ipsum, iusto minima blanditiis ullam unde commodi. Maiores, tenetur, velit praesentium ipsam iusto odit ipsum fuga, sunt aperiam corporis laboriosam?
  Quos eius tempora voluptas expedita voluptatum, laboriosam, dolor dolores quidem reprehenderit cumque suscipit odit ullam, atque et odio numquam aut quo? Modi blanditiis ipsa provident sed maiores, cum necessitatibus accusamus.
  Velit ullam rem totam quasi. Aliquam ab debitis quibusdam est quae eligendi ut cupiditate laboriosam facilis, odit, magni mollitia pariatur. Officia illo itaque perferendis alias sunt nulla quas, et rem?
  Consectetur, laboriosam voluptate. Dicta vero consequatur voluptates adipisci minus soluta vitae a, accusamus sint labore minima explicabo tempora reiciendis sequi nobis velit molestias facere praesentium veniam alias dolore eligendi molestiae.
  Culpa molestias fuga similique consectetur aut architecto incidunt, ullam aspernatur earum necessitatibus possimus consequuntur aliquid nihil error maiores excepturi ducimus soluta deserunt iure natus! Optio quos ea exercitationem voluptas delectus.
  Corporis facilis labore vero excepturi odit eius voluptatum velit, dignissimos numquam. Dolores quaerat perspiciatis harum eaque fugiat commodi sint adipisci repellendus. Modi cum rerum voluptas officiis molestiae nemo harum rem!
  Odit voluptates, inventore pariatur neque harum suscipit optio amet! Voluptas numquam iusto nihil quae obcaecati dicta iste minima fugit! In mollitia pariatur ullam quibusdam ipsam veniam repellat animi quos distinctio.
  Perspiciatis praesentium facere tempore excepturi officiis reprehenderit consequatur enim repudiandae eius, aut facilis dignissimos delectus libero quidem sit ducimus minus! In sed dolor molestias unde repudiandae quae veritatis suscipit debitis!
  Eius nihil quas quibusdam consectetur fuga veritatis dolorem porro ullam officia quis! Facere molestias expedita voluptatibus omnis corrupti quod dolorum qui, odio accusantium at reiciendis aut odit laboriosam veniam itaque.
  Aliquam consequatur odit provident consequuntur earum soluta quibusdam nulla velit iste, ipsa vel? Nostrum eum non commodi vero pariatur, sequi amet ex similique tempore earum ratione nemo, quis accusamus perferendis?
  Repellat rerum repellendus consectetur. Nihil repellendus minima quam voluptates vitae. Nostrum exercitationem suscipit odit ipsam laboriosam, deleniti ipsum nulla dolores ad commodi aliquam corporis! Sint veritatis fugit numquam molestiae assumenda!
  Explicabo autem, illum voluptatum dolor dolorem, ut quas perspiciatis, repellendus id quasi optio. Molestias ex repudiandae incidunt, aliquid eaque reiciendis facilis officia velit eos voluptatem vero eveniet assumenda expedita ut.
  Rem id accusamus dolorem sequi consectetur et ut mollitia aliquam minus ipsa, delectus in numquam, totam exercitationem quae accusantium voluptatum sint quos amet incidunt! Sint ab tenetur necessitatibus id perspiciatis!
  Alias sunt error eveniet mollitia beatae, accusamus commodi, rerum fugit qui unde dolorum neque nemo, voluptate odit laboriosam. Vitae fuga optio officiis illum, unde cum perspiciatis explicabo cumque placeat non.
  Libero magni at quo pariatur voluptatum, dignissimos recusandae ipsam, assumenda alias quas in nemo, cum quia repellat tenetur sapiente quae quos ab unde culpa nisi iure doloremque consectetur delectus? Quod?
  Fugit, numquam error reiciendis possimus distinctio doloremque vel itaque recusandae dignissimos? Est ducimus laudantium quae maiores esse, temporibus placeat vitae eos optio consequuntur mollitia molestiae omnis aut porro consectetur debitis.
  Commodi tempore dolor sed aspernatur nobis tempora ad temporibus consequuntur omnis beatae est mollitia doloremque assumenda incidunt ducimus reiciendis adipisci ratione cumque, enim fugit nam sit sunt quod quos. Ex?
  Saepe sunt quidem neque quam, aut ad quod ipsum! Tempore ratione odit ullam quis. Illo reiciendis quis ipsa itaque minima fugiat aut consequatur iste, molestias quasi ex, odio, voluptates soluta?
  Beatae earum molestias eligendi amet similique facere illum inventore saepe nihil voluptatibus nisi recusandae deserunt voluptatum facilis totam aliquam dolorem quia minus ducimus repellat, sit laboriosam nam? Repellat, labore odit.
  Esse assumenda quas quasi! Accusantium esse impedit assumenda cumque, natus dicta eligendi voluptate veritatis in, quia repellat reprehenderit debitis voluptates, placeat laudantium praesentium qui ut. Neque id excepturi obcaecati totam.`,
  });
}
