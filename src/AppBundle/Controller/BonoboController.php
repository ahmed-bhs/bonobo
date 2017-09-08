<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Bonobo;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

/**
 * Bonobo controller.
 *
 * @Route("/bonobo")
 */
class BonoboController extends Controller
{
    /**
     * Lists all bonobo entities.
     *
     * @Route("/list", name="bonobo_list" )
     * @Method("GET")
     */
    public function bonoboListAction()
    {   /*init the 4 first bonobos */
        $em = $this->getDoctrine()->getManager();
        $bonobos = $em->getRepository('AppBundle:Bonobo')->findBonoboList($this->getUser());


        return $this->render('bonobo/bonobo_list.html.twig' ,['bonobos'=>$bonobos ]);

    }

     /**
     * Lists the next 4 bonobo .
     *
     * @Route("/list/{page}", name="bonobo_list_scroller", requirements={"page" = "\d+"} , options = { "expose" = true })
     * @Method("GET")
     */
    public function bonoboListScrollerAction($page)
    {
        $em = $this->getDoctrine()->getManager();
        $bonobos = $em->getRepository('AppBundle:Bonobo')->findBonoboListByPage($this->getUser(),$page);


        /* preparing data for the infinite scroll*/
        $data=[];
        if(!$bonobos) $data=['last_page'=>true];
            else{
                    foreach ($bonobos as $bonobo) {
                       if(  $this->getUser()->getFriendList()->contains($bonobo)){


                           $data[] =['id'=>$bonobo->getId(),'age'=>$bonobo->getAge(),'nourriture'=>$bonobo->getNourriture(),'race'=>$bonobo->getRace(),'famille'=>$bonobo->getFamille(),'fileName'=>$bonobo->getfileName(),'name'=>$bonobo->getName(),'friend'=>true];



                       }else       $data[] =['id'=>$bonobo->getId(),'age'=>$bonobo->getAge(),'nourriture'=>$bonobo->getNourriture(),'race'=>$bonobo->getRace(),'famille'=>$bonobo->getFamille(),'fileName'=>$bonobo->getfileName(),'name'=>$bonobo->getName(),'friend'=>false];
                   }
                }

        return  new JsonResponse( $data );
    }








    /**
     * Lists bonobo's friends .
     *
     * @Route("/friend-list/{page}", requirements={"page" = "\d+"} , options = { "expose" = true }, name="bonobo_friend_scroller")
     * @Method("GET")
     */
    public function bonoboFriendScrollerAction($page)
    {   /*init the 4 first friends */
        $offset=$page*4;
        $bonobos = array_slice( $this->getUser()->getFriendList()->getValues(), $offset, 4);
        $data=[];
        if(!$bonobos) $data=['last_page'=>true];
        else{
           foreach ($bonobos as $bonobo) {
               $data[] =['id'=>$bonobo->getId(),'age'=>$bonobo->getAge(),'nourriture'=>$bonobo->getNourriture(),'race'=>$bonobo->getRace(),'famille'=>$bonobo->getFamille(),'fileName'=>$bonobo->getfileName(),'name'=>$bonobo->getName(),'friend'=>true];
           }
        }

        return  new JsonResponse( $data );
    }






    /**
     * Lists bonobo's friends .
     *
     * @Route("/friend-list", name="bonobo_friend_list")
     * @Method("GET")
     */
    public function bonoboFriendListAction()
    {   /*init the 4 first friends */

        $bonobos = array_slice( $this->getUser()->getFriendList()->getValues(), 0, 4);


        return $this->render('bonobo/friend_list.html.twig', array(
            'bonobos' => $bonobos,
        ));
    }



    /**
     * Add a friend  .
     *
     * @Route("/add-friend", name="bonobo_add_friend" , options = { "expose" = true })
     * @Method("POST")
     */
    public function bonoboAddFriendAction(Request $request)
    {

        if ($request->isMethod('POST')) {

         if ($request->isXmlHttpRequest()) {

                $id=$request->request->get('id');
                $em = $this->getDoctrine()->getManager();
                $bonobo =$this->getUser();
                $friend=$em->getRepository('AppBundle:Bonobo')->findOneBy(array('id'=>$id));
                if($friend ) {$bonobo->addFriendList($friend);
                                $em->persist($bonobo);
                                $em->flush();
                return new JsonResponse('sucess',200  )   ;}

                }
         }
                return new JsonResponse('error',400)   ;

    }


    /**
     * Remove a friend .
     *
     * @Route("/remove-friend", name="bonobo_remove_friend" , options = { "expose" = true })
     * @Method("DELETE")
     */
    public function bonoboRemoveFriendAction(Request $request)
    {
        if ($request->isMethod('DELETE')) {

        if ($request->isXmlHttpRequest()) {
         $id=$request->request->get('id');
        $em = $this->getDoctrine()->getManager();
        $bonobo = $this->getUser();
        $friend=$em->getRepository('AppBundle:Bonobo')->findOneBy(array('id'=>$id));
        if($friend) $bonobo->removeFriendList($friend);
        $em->persist($bonobo);
        $em->flush();

        return new JsonResponse('sucess', 200 )   ;

                }
            }
        return new JsonResponse('error', 400 )   ;


    }


    /**
     * Lists all bonobo entities.
     *
     * @Route("/count", name="count_bonobu" )
     * @Method("GET")
     */
    public function countAction()
    {$em = $this->getDoctrine()->getManager(); $c=$em->getRepository('AppBundle:Bonobo')->count($this->getUser()); 
    return new  Response($c); }

}