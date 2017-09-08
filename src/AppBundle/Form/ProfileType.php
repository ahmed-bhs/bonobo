<?php

namespace AppBundle\Form;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use FOS\UserBundle\Util\LegacyFormHelper;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Security\Core\Validator\Constraints\UserPassword;
use FOS\UserBundle\Form\Type\ProfileFormType as BaseType;
use Vich\UploaderBundle\Form\Type\VichFileType;
 
class ProfileType extends AbstractType
{
    
     public function buildForm(FormBuilderInterface $builder, array $options)
    { /*no need for emai, username and current password filed*/
   
    $builder    ->remove('email')->remove('username')->remove('current_password')   ->add('famille')  ->add('race')->add('nourriture') ->add('age')->
        add('file',

         VichFileType::class, [
         
         'error_bubbling'=>true,
         'required' => false,
         'allow_delete' => false, 
          
         'label' => false, 

         ]);;
    }
   
      public function getParent()
    {
        return 'FOS\UserBundle\Form\Type\ProfileFormType';}
    public function getBlockPrefix()
    {
        return 'app_user_profile';
    }
    // For Symfony 2.x
    public function getName()
    {
        return $this->getBlockPrefix();
    }
}